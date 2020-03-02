using Microsoft.EntityFrameworkCore;
using BoucleTranscription.Models;
namespace BoucleTranscription.Repositories
{
    public class BoucleDataContext: DbContext
    {
        public DbSet<Clip> Clips { get; set; } 
            
        public BoucleDataContext(DbContextOptions<BoucleDataContext> options) : base(options) {}
        
        
    }
}