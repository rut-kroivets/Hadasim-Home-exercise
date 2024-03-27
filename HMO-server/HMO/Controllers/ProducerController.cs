using AutoMapper;
using HMO.API.Models;
using HMO.Core.DTOs;
using HMO.Core.Entity;
using HMO.Core.Service;
using HMO.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HMO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducerController : ControllerBase
    {
        private readonly IProducerService _producerService;
        private readonly IMapper _mapper;
        public ProducerController(IProducerService producerService, IMapper mapper)
        {
            _producerService = producerService;
            _mapper = mapper;
        }
        // GET: api/<ProducerController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producer>>> GetAsync()
        {
            var list = await _producerService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<ProducerDto>>(list);
            return Ok(listDto);
        }

        // GET api/<ProducerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producer>> Get(int id)
        {
            var producer = await _producerService.GetAsync(id);
            var producerDto = _mapper.Map<ProducerDto>(producer);
            return Ok(producerDto);
        }

        // POST api/<ProducerController>
        [HttpPost]
        public async Task<ActionResult<Producer>> Post([FromBody] ProducerPostModel value)
        {
            var producerToAdd = _mapper.Map<Producer>(value);
            await _producerService.PostAsync(producerToAdd);
            var producerDto = _mapper.Map<ProducerDto>(producerToAdd);
            return Ok(producerDto);
        }
        // PUT api/<ProducerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProducerPostModel value)
        {
            Producer existProducer = await _producerService.GetAsync(id);

            if (existProducer is null)
            {
                return NotFound();
            }
            _mapper.Map(value, existProducer);

            await _producerService.PutAsync(id, existProducer);

            return Ok(_mapper.Map<ProducerDto>(existProducer));
        }

        // DELETE api/<ProducerController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _producerService.DeleteAsync(id);
        }
    }
}
