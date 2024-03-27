using HMO.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Service
{
    public interface IProducerService
    {
        public Task<IEnumerable<Producer>> GetAsync();
        public Task<Producer> GetAsync(int id);
        public Task<Producer> PostAsync(Producer value);
        public Task PutAsync(int id, Producer value);
        public Task DeleteAsync(int id);
    }
}
