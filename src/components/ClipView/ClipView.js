import React, { useEffect, useState } from "react";
import axios from "axios";

export function ClipView() {
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get();
      setTranscription(response.data.transcription);
    })();
  });
  return (
    <input
      data-testid="transcription-input"
      type="textarea"
      onChange={() => {
        setTranscription(transcription);
      }}
      value={transcription}
    />
  );
}
