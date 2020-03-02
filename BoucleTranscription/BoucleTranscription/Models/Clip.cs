namespace BoucleTranscription.Models
{
    public class Clip
    {
        public int Id { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public string Transcription { get; set; }
    }
}