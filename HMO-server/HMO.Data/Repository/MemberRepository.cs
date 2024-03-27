using HMO.Core.Entity;
using HMO.Core.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data.Repository
{
    public class MemberRepository: IMemberRepository
    {
        private readonly DataContext _dataContext;
        public MemberRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<IEnumerable<Member>> GetAsync()
        {
            return await _dataContext.members
                .Include(m => m.Vaccinations)
                .ThenInclude(v => v.Producer) // Include the Producer navigation property of Vaccinations
                .ToListAsync();
        }


        public async Task<Member> GetAsync(int id)
        {
            return await _dataContext.members.FindAsync(id);
        }

        public async Task<Member> PostAsync(Member value)
        {
            _dataContext.members.Add(value);
            await _dataContext.SaveChangesAsync();
            return value;
        }

        public async Task PutAsync(int id, Member value)
        {
            var m = _dataContext.members.Find(id);
            m.Identity = value.Identity;
            m.Name = value.Name;
            m.DateOfBirth = value.DateOfBirth;
            m.City = value.City;
            m.Street = value.Street;
            m.HouseNumber = value.HouseNumber;
            m.Phone = value.Phone;
            m.MobilePhone = value.MobilePhone;
            m.Vaccinations = value.Vaccinations;
            m.StartOfIll = value.StartOfIll;
            m.EndOfIll = value.EndOfIll;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var member = _dataContext.members.Find(id);
            _dataContext.members.Remove(member);
            await _dataContext.SaveChangesAsync();
        }
    }
}
