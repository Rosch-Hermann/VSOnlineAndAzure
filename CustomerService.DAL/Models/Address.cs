using System.ComponentModel.DataAnnotations;

namespace CustomerService.DAL.Models
{
    public class Address
    {
        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        [RegularExpression(@"\d{5}-\d{4}|\d{5}|\d{9}")]
        public string Zip { get; set; }
    }
}