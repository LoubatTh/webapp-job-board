import axios from "axios";
import process from "process";

export const API = axios.create({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
});
