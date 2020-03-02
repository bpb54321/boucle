using System;
using System.Security.Claims;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace BoucleTransriptionTests
{
    public class UnitTest1
    {
        [Fact]
        public void get_clip_by_id_gets_the_correct_clip()
        {
            var options = new DbContextOptionsBuilder<BoucleDataContext>()
                .UseInMemoryDatabase(databaseName: "get_clip_by_id_gets_the_correct_clip").Options;

            using (var context = new BoucleDataContext(options))
            {
                var clip = new Clip {
                    StartTime = 0,
                    EndTime = 5,
                    Transcription = "transcribed text"
                };
                context.Clips.Add(clip);
                context.SaveChanges();
            }
        }
    }
}