import { API } from "../components/api/Request";

export const GetAdvertisement = async () => API.get("/api/advertisement");

export const GetAdvertisementById = async (id) =>
  API.get(`/api/advertisement/${id}`);

export const PostAdvertisement = async (data) =>
  API.post("/api/advertisement", data);

export const PutAdvertisement = async (id, data) =>
  API.put(`/api/advertisement/${id}`, data);

export const DeleteAdvertisement = async (id) =>
  API.put(`/api/advertisement/${id}`);
