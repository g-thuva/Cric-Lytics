using Microsoft.EntityFrameworkCore;
using cricketic.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Enable CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // URL of your React frontend
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Get connection string from configuration (first check for DefaultConnectionSQLServer, then fallback)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionSQLServer") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection"); // Fallback to DefaultConnection if not found

// Register DbContext with sensitive data logging based on environment
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.UseSqlServer(connectionString)
               .EnableSensitiveDataLogging()  // Enable sensitive data logging for development
               .LogTo(Console.WriteLine);    // Log SQL queries to console for debugging
    }
    else
    {
        options.UseSqlServer(connectionString);  // For production, avoid sensitive logging
    }
});

// Optional logging setup
builder.Logging.ClearProviders();  // Clear existing log providers (optional)
builder.Logging.AddConsole();     // Add console logging

var app = builder.Build();

// Middleware pipeline configuration
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Show detailed exception page in development
}
else
{
    app.UseExceptionHandler("/Home/Error"); // General error handling for production
    app.UseHsts();  // HTTP Strict Transport Security for secure connections
}

app.UseHttpsRedirection();  // Redirect HTTP requests to HTTPS
app.UseStaticFiles();       // Serve static files (e.g., JS, CSS)
app.UseRouting();           // Enable routing for controllers and endpoints
app.UseCors("AllowReactApp"); // Use CORS policy for React frontend
app.UseAuthorization();      // Enable authorization middleware

// Default route mapping for controllers
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();  // Run the application
