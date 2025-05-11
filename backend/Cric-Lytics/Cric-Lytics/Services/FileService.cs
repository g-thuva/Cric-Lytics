using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Cric_Lytics.Services
{
    public interface IFileService
    {
        Task<string> SaveImageAsync(IFormFile file);
    }

    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<FileService> _logger;

        public FileService(IWebHostEnvironment environment, ILogger<FileService> logger)
        {
            _environment = environment;
            _logger = logger;
        }
        public async Task<string> SaveImageAsync(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    _logger.LogWarning("File is null or empty");
                    return null; 
                }
                // Make sure wwwroot exists with error handling
                var webRootPath = _environment.WebRootPath;
                if (string.IsNullOrEmpty(webRootPath))
                {
                    try
                    {
                        webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                        if (!Directory.Exists(webRootPath))
                        {
                            Directory.CreateDirectory(webRootPath);
                            _logger.LogInformation($"Created wwwroot directory at: {webRootPath}");
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"Failed to create wwwroot directory at: {webRootPath}");
                        return null; // Return null instead of crashing
                    }
                }

                // Create uploads directory 
                var uploadsFolder = Path.Combine(webRootPath, "uploads");
       
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    _logger.LogWarning($"Invalid file extension: {fileExtension}");
                    return null;
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Save file  
                try
                {
                    await using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    if (!System.IO.File.Exists(filePath))
                    {
                        string errorMsg = $"File was not saved to: {filePath}";
                        _logger.LogError(errorMsg);
                        return null;
                    }

                    // Return relative path to file
                    return $"/uploads/{uniqueFileName}";

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Failed to save file to: {filePath}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error saving image file"); 
                return null; ;
            }
        }
    }
}