using System;
using System.Security.Claims;
using System.Threading.Tasks;
using BoucleTranscription.Controllers;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace BoucleTransriptionTests
{
    public class UnitTest1
    {
        [Fact]
        public async Task get_clip_by_id_gets_the_correct_clip()
        {
            int savedClipId;
            var options = new DbContextOptionsBuilder<BoucleDataContext>()
                .UseInMemoryDatabase(databaseName: "get_clip_by_id_gets_the_correct_clip").Options;

            await using (var context = new BoucleDataContext(options))
            {
                var clip = new Clip {
                    StartTime = 0,
                    EndTime = 5,
                    Transcription = "transcribed text"
                };
                context.Clips.Add(clip);
                context.SaveChanges();
                savedClipId = clip.Id;
            }

            await using (var context = new BoucleDataContext(options))
            {
                var clipController = new ClipController(context);

                var gotClip = await clipController.GetClipById(id: savedClipId);
                
                gotClip.Id.Should().Be(savedClipId);
            }
        }
    }
}