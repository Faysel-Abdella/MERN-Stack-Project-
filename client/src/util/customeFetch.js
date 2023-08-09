import axios from "axios";
const customeFetch = axios.create({
  baseURL: "/api/v1",
});

export default customeFetch;
