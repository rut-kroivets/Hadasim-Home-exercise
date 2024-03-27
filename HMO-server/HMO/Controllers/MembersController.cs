using AutoMapper;
using HMO.API.Models;
using HMO.Core.DTOs;
using HMO.Core.Entity;
using HMO.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HMO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IMapper _mapper;
        public MembersController(IMemberService memberService, IMapper mapper)
        {
            _memberService = memberService;
            _mapper = mapper;
        }
        // GET: api/<MembersController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetAsync()
        {
            var list = await _memberService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<MemberDto>>(list);

            return Ok(listDto);
        }
        // GET api/<MembersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> Get(int id)
        {
            var member = await _memberService.GetAsync(id);
            var memberDto = _mapper.Map<MemberDto>(member);
            return Ok(memberDto);
        }

        // POST api/<MembersController>
        [HttpPost]
        public async Task<ActionResult<Member>> Post([FromBody] MemberPostModel value)
        {
            var memberToAdd = _mapper.Map<Member>(value);
            await _memberService.PostAsync(memberToAdd);
            var memberDto = _mapper.Map<MemberDto>(memberToAdd);
            return Ok(memberDto);
        }

        // PUT api/<MembersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] MemberPostModel value)
        {
            Member existMember = await _memberService.GetAsync(id);

            if (existMember is null)
            {
                return NotFound();
            }
            _mapper.Map(value, existMember);

            await _memberService.PutAsync(id, existMember);

            return Ok(_mapper.Map<MemberDto>(existMember));
        }

        // DELETE api/<MembersController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _memberService.DeleteAsync(id);
        }
    }
}
