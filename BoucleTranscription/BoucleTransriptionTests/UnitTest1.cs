using System;
using System.Security.Claims;
using BoucleTranscription.Models;
using Xunit;

namespace BoucleTransriptionTests
{
    public class UnitTest1
    {
        [Fact]
        public void get_clip_by_id_gets_the_correct_clip()
        {
            var clip = new Clip {
                StartTime = 0,
                EndTime = 5,
                Transcription = "transcribed text"
            };
        }
    }
}