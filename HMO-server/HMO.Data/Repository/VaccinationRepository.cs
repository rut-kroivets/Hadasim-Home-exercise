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
    public class VaccinationRepository: IVaccinationRepository
    {
        private readonly DataContext _dataContext;
        public VaccinationRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<IEnumerable<Vaccination>> GetAsync()
        {
            return await _dataContext.vaccinations.Include(v=>v.Producer).ToListAsync();
        }

        public async Task<Vaccination> GetAsync(int id)
        {
            return await _dataContext.vaccinations
                                    .Include(v => v.Producer)
                                    .FirstOrDefaultAsync(v => v.Id == id);
        }


        public async Task<Vaccination> PostAsync(Vaccination value)
        {
            _dataContext.vaccinations.Add(value);
            await _dataContext.SaveChangesAsync();
            return value;
        }

        public async Task PutAsync(int id, Vaccination value)
        {
            var v = _dataContext.vaccinations.Find(id);
            v.Producer = value.Producer;
            v.Date = value.Date;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var vaccination = _dataContext.vaccinations.Find(id);
            _dataContext.vaccinations.Remove(vaccination);
            await _dataContext.SaveChangesAsync();
        }
    }
}
