import { API } from "../components/api/Request";

export const GetUser = async () =>
  API.get("/api/user", { withCredentials: true });

export const GetUserById = async (id) =>
  API.get(`/api/user/${id}/`, { withCredentials: true });

export const PostUser = async (data) =>
  API.post("/api/user", data, { withCredentials: true });

export const PutUser = async (id, data) =>
  API.put(`/api/user/${id}/`, data, { withCredentials: true });

export const DeleteUser = async (id) =>
  API.delete(`/api/user/${id}/`, { withCredentials: true });

export const Register = async (data) => API.post("/api/register", data);

export const Login = async (data) => API.post("/api/login", data);

export const Logout = async () => API.post("/api/logout");