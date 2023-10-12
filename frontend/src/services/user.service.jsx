import { API } from "../components/api/Request";

export const GetUser = async () => API.get("/api/user");

export const GetUserById = async (id) => API.get(`/api/user/${id}`);

export const PostUser = async (data) => API.post("/api/user", data);

export const PutUser = async (id, data) => API.put(`/api/user/${id}`, data);

export const DeleteUser = async (id) => API.put(`/api/user/${id}`);

export const Login = async (data) => API.post("/api/login", data);