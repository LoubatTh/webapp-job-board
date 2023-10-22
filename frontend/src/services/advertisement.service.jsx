import { API } from "../components/api/Request";

export const GetAdvertisement = async () =>
  API.get("/api/advertisement", { withCredentials: true });

export const GetAdvertisementById = async (id) =>
  API.get(`/api/advertisement/${id}/`, { withCredentials: true });

export const GetAdvertisementApplications = async (id) =>
  API.get(`/api/advertisement/application/${id}`, { withCredentials: true });

export const PostAdvertisement = async (data) =>
  API.post("/api/advertisement", data, { withCredentials: true });

export const PutAdvertisement = async (id, data) =>
  API.put(`/api/advertisement/${id}/`, data, { withCredentials: true });

export const DeleteAdvertisement = async (id) =>
  API.delete(`/api/advertisement/${id}/`, { withCredentials: true });
