using System.Threading.Tasks;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
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
        public async Task<ActionResult<Clip>> GetById(int id)
        {
            var match = await _clips.GetById(id);
            return match;

        }

        [HttpPost]
        public async Task<ActionResult<Clip>> Create(Clip clip)
        {
            await _clips.Create(clip);
            return clip;
        }
        
    }
}