using System;
using System.Threading.Tasks;
using BoucleTranscription.Controllers;
using BoucleTranscription.Models;
using BoucleTranscription.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace BoucleTransriptionTests.Controller
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

                ActionResult<Clip> gotClipActionResult = await clipController.GetById(id: savedClipId);

                gotClipActionResult.Value.Id.Should().Be(savedClipId);
                gotClipActionResult.Value.StartTime.Should().Be(clipStartTime);
                gotClipActionResult.Value.EndTime.Should().Be(clipEndTime);
                gotClipActionResult.Value.Transcription.Should().Be(clipTranscription);
            }
        }
    }
}