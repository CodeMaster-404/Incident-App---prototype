using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IncidentApplication.Models.Requests
{
    public class LogIncidentRequest
    {
        

        [Required]
        public string Location { get; set; }

        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime Date_Logged { get; set; }

        [Required]
        public int StatusId { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
