import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default {
  getClipIds: async () => {
    const response = await axios.get(`${apiBaseUrl}/clips`);
    const { data: clipIds } = response;
    return clipIds;
  },
  getClipById: async () => {
    return {
      startTime: 0,
      endTime: 5,
      transcription: ""
    };
  }
};
