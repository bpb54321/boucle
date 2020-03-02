using System.ComponentModel.DataAnnotations.Schema;

namespace BoucleTranscription.Models
{
    [Table("clip")]
    public class Clip
    {
        [Column("id")]
        public int Id { get; set; }
        
        [Column("start_time")]
        public int StartTime { get; set; }
        
        [Column("end_time")]
        public int EndTime { get; set; }
        
        [Column("transcription")]
        public string Transcription { get; set; }
    }
}