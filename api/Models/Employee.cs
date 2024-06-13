using api.Types;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations;
using System.Transactions;

namespace api.Models
{
    public class Employee
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Comments { get; set; }
        public bool? IsFriendly { get; set; }
        public int? BirthYear { get; set; }
        public decimal? Weight { get; set; }

        public int? EmploymentStatus { get; set; }
        public int? FavoriteColor { get; set; }
        //public EmploymentStatus EmploymentStatus { get; set; }
        //public FavoriteColor FavoriteColor { get; set; }
    }
}
