import { API } from "../components/api/Request";

export const GetCompany = async () => API.get("/api/company");

export const GetCompanyById = async (id) =>
  API.get(`/api/company/${id}/`);

export const PostCompany = async (data) =>
  API.post("/api/company", data);

export const PutCompany = async (id, data) =>
  API.put(`/api/company/${id}/`, data);

export const DeleteCompany = async (id) =>
  API.delete(`/api/company/${id}/`);
