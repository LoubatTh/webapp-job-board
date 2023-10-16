import { API } from "../components/api/Request";

export const GetApplication = async () => API.get("/api/application");

export const GetApplicationById = async (id) =>
  API.get(`/api/application/${id}`);

export const PostApplication = async (data) =>
  API.post("/api/application", data);

export const PutApplication = async (id, data) =>
  API.put(`/api/application/${id}`, data);

export const DeleteApplication = async (id) =>
  API.delete(`/api/application/${id}`);
