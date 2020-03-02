using System.Net;
using System.Threading.Tasks;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;

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
        public Task<Clip> GetClipById(int id)
        {
            return _clips.GetById(id);
            
        }
        
    }
}