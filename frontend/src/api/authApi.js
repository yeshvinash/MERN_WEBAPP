import { api } from "./axiosInstance";

export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

export const user = () => api.get("/auth/user");

export const contact = (data) => api.post("/form/contact", data);

export const service = () => api.get("/data/service");

export const userAdmin = () => api.get("/admin/users");

export const deleteUser = (id) => api.delete(`/admin/users/delete/${id}`);

export const updateUser = (id, data) =>
  api.put(`/admin/users/update/${id}`, data);

export const contactAdmin = () => api.get("/admin/contacts");

export const deleteContact = (id) => api.delete(`/admin/contacts/delete/${id}`);
