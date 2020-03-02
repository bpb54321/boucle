using System.Threading.Tasks;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;

namespace BoucleTranscription.Controllers
{
    public class ClipController : ControllerBase
    {
        private readonly ClipRepository _clips;

        public ClipController(BoucleDataContext context)
        {
            _clips = new ClipRepository(context);
        }
        
        public Task<Clip> GetClipById(int id)
        {
            return _clips.GetById(id);
        }
    }
}