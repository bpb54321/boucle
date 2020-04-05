using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BoucleTranscription.Models;
using Microsoft.EntityFrameworkCore;

namespace BoucleTranscription.Repositories
{
    public class ClipRepository : IClipRepository
    {
        private readonly BoucleDataContext _context;
        public ClipRepository(BoucleDataContext context)
        {
            _context = context;
        }
        
        public async Task<Clip> GetById(int id)
        {
            return await _context.FindAsync<Clip>(id);
        }

        public async Task<Clip> Create(Clip clip)
        {
            _context.Clips.Add(clip);
            await _context.SaveChangesAsync();
            return clip;
        }

        public async Task<List<Clip>> GetAll()
        {
            return await _context.Clips.ToListAsync();
        }
    }
}