import api from "../api/axios";
import type { Class } from "../types/class";

export const getClasses = () => api.get("/classes");

export const getClass = (id: number) => api.get(`/classes/${id}`);

export const createClass = (data: Class) => api.post("/classes", data);

export const updateClass = (id: number, data: Class) =>
  api.put(`/classes/${id}`, data);

export const deleteClass = (id: number) => api.delete(`/classes/${id}`);
