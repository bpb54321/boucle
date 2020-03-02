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
        public IEnumerable<Clip> Get()
        {
            // return _clips.GetById(id);
            return new List<Clip> {
                new Clip {
                    Id = 1,
                    StartTime = 0,
                    EndTime = 5,
                    Transcription = "0 - 5"
                }, 
                new Clip {
                    Id = 2,
                    StartTime = 5,
                    EndTime = 10,
                    Transcription = "0 - 5"
                }
            };

        }
        
    }
}