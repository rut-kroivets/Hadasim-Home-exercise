using AutoMapper;
using HMO.API.Models;
using HMO.Core.Entity;
using System;

namespace HMO.API.Mapping
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<MemberPostModel, Member>();
            CreateMap<VaccinationPostModel, Vaccination>();
            CreateMap<ProducerPostModel, Producer>();
        }
    }
}
