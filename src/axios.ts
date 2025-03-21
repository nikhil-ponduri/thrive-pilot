import axios from 'axios';

export default axios.create({
  baseURL: "http://api.thrivesparrow.test/api/developer",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});
