﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Entity
{
    public class Member
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public string DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public List<Vaccination> Vaccinations { get; set; }
        public string StartOfIll { get; set; }
        public string EndOfIll { get; set; }
    }
}
