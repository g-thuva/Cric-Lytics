using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CricLytics.Data; // For DbContext
using CricLytics.Models; // For User model
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Net;
using System.Net.Mail;




namespace CricLytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly CricLyticsDbContext _context;
        private readonly IConfiguration _configuration;

        private readonly UserManager<IdentityUser> _userManager;

        // Inject UserManager into the controller

        private bool IsValidPassword(string password)
        {
            if (password.Length < 8)
                return false;

            bool hasUpper = password.Any(char.IsUpper);
            bool hasLower = password.Any(char.IsLower);
            bool hasDigit = password.Any(char.IsDigit);
            bool hasSymbol = password.Any(ch => !char.IsLetterOrDigit(ch));

            return hasUpper && hasLower && hasDigit && hasSymbol;
        }

        public AuthController(
    CricLyticsDbContext context,
    IConfiguration configuration,
    UserManager<IdentityUser> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        // Register endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            // Check if username or club already exists
            var exists = await _context.Users
                .AnyAsync(u => u.Username == model.Username || u.ClubName == model.ClubName);

            if (exists)
                return BadRequest("Username or Club Name already exists.");

            if (!IsValidPassword(model.Password))
                return BadRequest("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");


            var passwordHasher = new PasswordHasher<User>();

            var user = new User
            {
                Username = model.Username,
                ClubName = model.ClubName,
                Email = model.Email,
                Password = "",
                Otp = ""
            };

            user.Password = passwordHasher.HashPassword(user, model.Password);


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            // Use EF.Functions.Collate to enforce case-sensitive comparison in SQL Server
            var user = await _context.Users
    .FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null)
                return Unauthorized("Invalid credentials");

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, model.Password);

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized("Invalid credentials");


            // Generate JWT token
            var token = GenerateJwtToken(user.Username);
            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            var secretKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key is missing");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        // Check if username exists (for forgot password step 1)
        [HttpPost("username-check")]
        public async Task<IActionResult> UsernameCheck([FromBody] UsernameCheckModel model)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == model.Username);

            if (userExists)
                return Ok(new { exists = true });
            else
                return NotFound(new { exists = false, message = "Username not found" });
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] UsernameCheckModel model)
        {
            // Find the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();
            user.Otp = otp;
            user.OtpExpiration = DateTime.UtcNow.AddMinutes(1);

            // Compose email
            var fromEmail = "g.thuva1@gmail.com";
            var toEmail = user.Email;  // Assumes user's email is in the database
            var subject = "Your CricLytics OTP Code";
            var body = $"Hello {user.Username},\n\nYour OTP is: {otp}\n\nThis OTP will expire in 10 minutes.";

            try
            {
                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.Credentials = new NetworkCredential(fromEmail, "yphvybcqtwskrsdz");
                    smtpClient.EnableSsl = true;

                    var mailMessage = new MailMessage(fromEmail, toEmail, subject, body);
                    await smtpClient.SendMailAsync(mailMessage);
                }

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "OTP sent successfully to your registered email address." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send OTP email", error = ex.Message });
            }
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerifyModel model)
        {
            //Find the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null)
            {
                return NotFound(new { message = "Username not found" });
            }

            // Check if the OTP is correct
            if (user.Otp != model.Otp)
            {
                return BadRequest(new { message = "Invalid OTP" });
            }

            // Check if the OTP has expired
            if (user.OtpExpiration < DateTime.UtcNow)
            {
                return BadRequest(new { message = "OTP has expired" });
            }

            //  OTP is valid, allow user to reset password
            return Ok(new { message = "OTP verified successfully. You can now reset your password." });
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp([FromBody] UsernameCheckModel model)
        {
            // Find the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Check if OTP is expired or doesn't exist
            if (user.OtpExpiration < DateTime.UtcNow || string.IsNullOrEmpty(user.Otp))
            {
                // Generate new OTP
                var otp = new Random().Next(100000, 999999).ToString();

                // Update OTP and expiration
                user.Otp = otp;
                user.OtpExpiration = DateTime.UtcNow.AddMinutes(10);

                // Email details
                var fromEmail = "g.thuva1@gmail.com";
                var toEmail = user.Email;  // Ensure this is set in your database
                var subject = "Your CricLytics OTP Code (Resent)";
                var body = $"Hello {user.Username},\n\nYour new OTP is: {otp}\n\nThis OTP will expire in 10 minutes.";

                try
                {
                    using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtpClient.Credentials = new NetworkCredential(fromEmail, "yphvybcqtwskrsdz");
                        smtpClient.EnableSsl = true;

                        var mailMessage = new MailMessage(fromEmail, toEmail, subject, body);
                        await smtpClient.SendMailAsync(mailMessage);
                    }

                    // Save OTP to DB
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "OTP resent successfully to your registered email address." });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Failed to send OTP email", error = ex.Message });
                }
            }

            // If OTP is still valid
            return Ok(new { message = "OTP is still valid. Please check your email." });
        }

        [HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
{
    // Find the user by username (make sure your Identity setup includes username as part of the User identity)
    var user = await _userManager.FindByNameAsync(request.Username);

    if (user == null)
    {
        return BadRequest("User not found.");
    }

    // Ensure the new password and confirm password match
    if (request.NewPassword != request.ConfirmPassword)
    {
        return BadRequest("Passwords do not match.");
    }

    // Hash the new password
    var passwordHasher = new PasswordHasher<IdentityUser>();
    var hashedPassword = passwordHasher.HashPassword(user, request.NewPassword);

    // Update password
    user.PasswordHash = hashedPassword;
    await _userManager.UpdateAsync(user);

    return Ok(new { success = true, message = "Password reset successful." });
}


    }

    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class UsernameCheckModel
    {
        public required string Username { get; set; }
    }

    public class OtpVerifyModel
    {
        public required string Username { get; set; }
        public required string Otp { get; set; }
    }

    public class ResetPasswordRequest
{
    public required string Username { get; set; }
    public required string NewPassword { get; set; }
    public required string ConfirmPassword { get; set; }
}



}
