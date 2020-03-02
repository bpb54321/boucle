using System.Threading.Tasks;
using BoucleTranscription.Models;

namespace BoucleTranscription.Repositories
{
    public class ClipRepository : IClipRepository
    {
        private readonly BoucleDataContext _context;
        public ClipRepository(BoucleDataContext context)
        {
            _context = context;
        }
        
        public Task<Clip> GetById(int id)
        {
            return _context.FindAsync<Clip>(id).AsTask();
        }
    }
}