import axios from "axios";

export const BASE_URL = "https://project-tracker-app-6803f-default-rtdb.asia-southeast1.firebasedatabase.app";

export const api = axios.create({
  baseURL: BASE_URL
});

export const getProjects = async () => {
  const { data } = await api.get(`/projects.json`);
  if (!data) return [];
  return Object.entries(data).map(([id, p]) => ({ id, ...p }));
};

export const createProject = async (project) => {
  const payload = { ...project, createdAt: Date.now() };
  const { data } = await api.post(`/projects.json`, payload);
  return { id: data.name, ...payload };
};

export const updateProject = async (id, patch) => {
  await api.patch(`/projects/${id}.json`, patch);
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}.json`);
};

export const getTasks = async (projectId) => {
  const { data } = await api.get(`/projects/${projectId}/tasks.json`);
  if (!data) return [];
  return Object.entries(data).map(([id, t]) => ({ id, ...t }));
};

export const createTask = async (projectId, task) => {
  const payload = { ...task, createdAt: Date.now() };
  const { data } = await api.post(`/projects/${projectId}/tasks.json`, payload);
  return { id: data.name, ...payload };
};

export const updateTask = async (projectId, taskId, patch) => {
  await api.patch(`/projects/${projectId}/tasks/${taskId}.json`, patch);
};

export const deleteTask = async (projectId, taskId) => {
  await api.delete(`/projects/${projectId}/tasks/${taskId}.json`);
};

export const subscribe = (path, onMessage) => {
  const url = `${BASE_URL}/${path}.json`;
  const es = new EventSource(url);

  es.onmessage = (evt) => {
    try {
      const msg = JSON.parse(evt.data); 
      onMessage(msg);
    } catch {
    }
  };
  es.onerror = () => {
    es.close();
    setTimeout(() => subscribe(path, onMessage), 1500);
  };
  return () => es.close();
};
