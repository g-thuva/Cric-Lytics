using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Cric_Lytics.Models
{
    public class PlayerDto
    {
        [Required]
        public string Name { get; set; }

        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        
        public DateTime DateOfBirth { get; set; }

        public int Age => CalculateAge(DateOfBirth);

       
        public string Role { get; set; }

        public string MedicalStatus { get; set; } = "Well";

        public string BattingStyle { get; set; }

        public string? BowlingStyle { get; set; } = string.Empty;

        public string Record { get; set; } = string.Empty;

        public IFormFile? Image { get; set; }  // Optional file upload

        [JsonIgnore]
        [BindNever]
        public string? ImageUrl { get; set; }  // Stores the URL after upload

        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age))
                age--;
            return age;
        }

    }
}