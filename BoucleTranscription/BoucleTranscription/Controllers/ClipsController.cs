using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using BoucleTranscription.Models;

namespace BoucleTranscription.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClipsController : ControllerBase
    {
        private readonly ClipRepository _clips;

        public ClipsController(BoucleDataContext context)
        {
            _clips = new ClipRepository(context);
        }
        
        [HttpGet]
        public async Task<ActionResult<Clip>> GetById(int id)
        {
            var match = await _clips.GetById(id);
            return match;

        }

        public async Task<ActionResult<Clip>> Create(Clip clip)
        {
            clip.Id = 1;
            return clip;
        }
        
    }
}