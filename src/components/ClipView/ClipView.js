import React, { useEffect, useState } from "react";
import axios from "axios";

export function ClipView({ id, ...props }) {
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await axios.get();
        setTranscription(response.data.transcription);
      })();
    }
  }, [id]);

  return (
    <textarea
      className={"App__textarea"}
      data-testid="transcription-input"
      type="textarea"
      onChange={() => {
        setTranscription(transcription);
      }}
      value={transcription}
    />
  );
}
