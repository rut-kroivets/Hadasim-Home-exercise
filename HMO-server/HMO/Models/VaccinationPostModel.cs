using HMO.Core.Entity;

namespace HMO.API.Models
{
    public class VaccinationPostModel
    {
        public int ProducerId { get; set; }
        public string Date { get; set; }
        public int MemberId { get; set; }
    }
}
