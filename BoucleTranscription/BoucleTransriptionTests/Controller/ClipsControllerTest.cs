using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        
        [Fact]
        public async Task get_clips_returns_array_of_all_clips() 
        {
            var options = new DbContextOptionsBuilder<BoucleDataContext>()
                .UseInMemoryDatabase(databaseName: "get_clips_returns_array_of_all_clips").Options;
            
            var clip1 = new Clip();
            var clip2 = new Clip();

            await using (var context = new BoucleDataContext(options))
            {
                context.Clips.Add(clip1);
                context.Clips.Add(clip2);
                context.SaveChanges();
            }

            await using (var context = new BoucleDataContext(options))
            {
                var clipsController = new ClipsController(context);

                var clipsActionResult = await clipsController.GetAll();

                clipsActionResult.Value.Should().BeEquivalentTo(new List<Clip>{ clip1, clip2 });
            }

        }
        
        [Fact]
        public async Task create_clip_creates_a_clip()
        {
            // Arrange
            const int clipStartTime = 0;
            const int clipEndTime = 5;
            const string clipTranscription = "";
            var clipToCreate = new Clip
            {
                StartTime = clipStartTime,
                EndTime = clipEndTime,
                Transcription = clipTranscription
            };
            
            var options = new DbContextOptionsBuilder<BoucleDataContext>()
                .UseInMemoryDatabase(databaseName: "create_clip_creates_a_clip").Options;


            // Act
            await using (var context = new BoucleDataContext(options))
            {
                var clipController = new ClipsController(context);

                var createdClipActionResult = await clipController.Create(clipToCreate);
                
                // Assert
                createdClipActionResult.Should().BeOfType<CreatedAtActionResult>();
                createdClipActionResult.RouteValues.Should().Contain("Id", clipToCreate.Id);

                var clip = createdClipActionResult.Value.As<Clip>();
                clip.Id.Should().BePositive();
                clip.StartTime.Should().Be(clipStartTime);
                clip.EndTime.Should().Be(clipEndTime);
                clip.Transcription.Should().Be(clipTranscription);
            }
            

            // Act
            await using (var context = new BoucleDataContext(options))
            {
                var allClips = await context.Clips.ToListAsync();
            
                // Assert
                allClips.Should().HaveCount(1);
                var newlyCreatedClip = allClips.First();
                newlyCreatedClip.Id.Should().Be(clipToCreate.Id);
                newlyCreatedClip.StartTime.Should().Be(clipStartTime);
                newlyCreatedClip.EndTime.Should().Be(clipEndTime);
                newlyCreatedClip.Transcription.Should().Be(clipTranscription);
            }
            
        }
    }
}