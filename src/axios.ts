import axios from 'axios';

export default axios.create({
  baseURL: "http://api.thrivesparrow.test/api/developer",
  headers: {
    Authorization: `Bearer pv_aKxWN9Sc6c7k2zgQotoo1UwoxeEN4b78R7NwMkqzL1SDFx9pK38LXo11nmWmR0cO`,
  },
});
