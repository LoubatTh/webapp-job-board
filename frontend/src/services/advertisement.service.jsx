import { API } from "../components/api/Request";

export const Hello = async () => API.get("/hello");