using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Entity
{
    public class Vaccination
    {
        public int Id { get; set; }
        public Producer Producer { get; set; }
        public int ProducerId { get; set; }
        public string Date { get; set; }
        public int MemberId { get; set; }
        public Member Member { get; set; }
    }
}
