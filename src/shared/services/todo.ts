import { api } from '../constants/api';
import { IGetTodoResponse, IListTodosResponse } from '../models/todo';

export const todoService = {
  list: async () => {
    const data = await api.get<IListTodosResponse>('/todo');
    return data.data;
  },

  find: async (id: string) => {
    const data = await api.get<IGetTodoResponse>(`/todo/${id}`);
    return data.data;
  },

  create: async (title: string, description: string) => {
    const data = await api.post('/todo', {
      title,
      description,
    });
    return data.data;
  },

  update: async (id: string | null | undefined, title: string, description: string) => {
    if (!id) return;
    const data = await api.put(`/todo/${id}`, {
      title,
      description,
    });
    return data.data;
  },

  toDone: async (id: string, done: boolean) => {
    const data = await api.put(`/todo/${id}`, { done });
    return data.data;
  },
};
