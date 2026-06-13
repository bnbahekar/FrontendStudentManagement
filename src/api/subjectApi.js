import axios from "axios";

const API = "http://localhost:8080/subjects";

export const getSubjects = () => axios.get(API);
export const getSubject = (id) => axios.get(`${API}/${id}`);
export const createSubject = (data) => axios.post(API, data);
export const updateSubject = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteSubject = (id) => axios.delete(`${API}/${id}`);
export const searchSubjects = (params) => axios.get(`${API}/search`, { params });
