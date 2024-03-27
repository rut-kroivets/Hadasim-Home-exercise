﻿using HMO.Core.Entity;

namespace HMO.API.Models
{
    public class MemberPostModel
    {
        public string Identity { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public string DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public string StartOfIll { get; set; }
        public string EndOfIll { get; set; }
    }
}
