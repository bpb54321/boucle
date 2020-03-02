using System.Threading.Tasks;
using BoucleTranscription.Controllers;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace BoucleTransriptionTests
{
    public class ClipsControllerTest
    {
        [Fact]
        public async Task get_clip_by_id_gets_the_correct_clip()
        {
            int savedClipId;
            const int clipStartTime = 0;
            const int clipEndTime = 5;
            const string clipTranscription = "transcribed test";
            
            var options = new DbContextOptionsBuilder<BoucleDataContext>()
                .UseInMemoryDatabase(databaseName: "get_clip_by_id_gets_the_correct_clip").Options;

            await using (var context = new BoucleDataContext(options))
            {
                var clip = new Clip {
                    StartTime = clipStartTime,
                    EndTime = clipEndTime,
                    Transcription = clipTranscription
                };
                context.Clips.Add(clip);
                context.SaveChanges();
                savedClipId = clip.Id;
            }

            await using (var context = new BoucleDataContext(options))
            {
                var clipController = new ClipsController(context);

                var gotClip = await clipController.GetClipById(id: savedClipId);
                
                gotClip.Id.Should().Be(savedClipId);
                gotClip.StartTime.Should().Be(clipStartTime);
                gotClip.EndTime.Should().Be(clipEndTime);
                gotClip.Transcription.Should().Be(clipTranscription);
            }
        }
    }
}