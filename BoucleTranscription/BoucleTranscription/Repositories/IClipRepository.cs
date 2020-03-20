using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BoucleTranscription.Models;

namespace BoucleTranscription.Repositories
{
    public interface IClipRepository
    {
        Task<Clip> GetById(int id);
        Task<Clip> Create(Clip clip);
    }
}
