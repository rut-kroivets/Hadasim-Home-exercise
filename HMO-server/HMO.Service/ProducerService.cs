using HMO.Core.Entity;
using HMO.Core.Repository;
using HMO.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Service
{
    public class ProducerService:IProducerService
    {
        private readonly IProducerRepository _producerRepository;
        public ProducerService(IProducerRepository context)
        {
            _producerRepository = context;
        }
        public async Task<IEnumerable<Producer>> GetAsync()
        {
            return await _producerRepository.GetAsync();
        }

        public async Task<Producer> GetAsync(int id)
        {
            return await _producerRepository.GetAsync(id);
        }

        public async Task<Producer> PostAsync(Producer value)
        {
            return await _producerRepository.PostAsync(value);
        }

        public async Task PutAsync(int id, Producer value)
        {
            await _producerRepository.PutAsync(id, value);
        }

        public async Task DeleteAsync(int id)
        {
            await _producerRepository.DeleteAsync(id);
        }
    }
}
