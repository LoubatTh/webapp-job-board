import { API } from "../components/api/Request";

export const Hello = async () => API.get("/hello");

export const GetAdvertisement = async () => API.get("/api/advertisement");

export const PostAdvertisement = async (data) => API.post("/api/advertisement", data);