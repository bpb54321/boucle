import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default {
  getClips: async () => {
    const response = await axios.get(`${apiBaseUrl}/clips`);
    const { data: clips } = response;
    return clips;
  },
  getClipById: async id => {
    const response = await axios.get(`${apiBaseUrl}/clips/${id}`);
    const { data: clip } = response;
    return clip;
  }
};
