using HMO.Core.Entity;
using HMO.Core.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data.Repository
{
    public class ProducerRepository:IProducerRepository
    {
        private readonly DataContext _dataContext;
        public ProducerRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<IEnumerable<Producer>> GetAsync()
        {
            return await _dataContext.Producer.ToListAsync();
        }

        public async Task<Producer> GetAsync(int id)
        {
            return await _dataContext.Producer.FindAsync(id);
        }

        public async Task<Producer> PostAsync(Producer value)
        {
            _dataContext.Producer.Add(value);
            await _dataContext.SaveChangesAsync();
            return value;
        }

        public async Task PutAsync(int id, Producer value)
        {
            var p = _dataContext.Producer.Find(id);
            p.Name = value.Name;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var producer = _dataContext.Producer.Find(id);
            _dataContext.Producer.Remove(producer);
            await _dataContext.SaveChangesAsync();
        }
    }
}
