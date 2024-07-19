import { useGetTodo } from '@/shared/hooks/react-query/useGetTodo';
import { todoService } from '@/shared/services/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import * as yup from 'yup';

export const schema = yup
  .object({
    title: yup.string().required("Title can't be empty"),
    description: yup.string().required("Description can't be empty"),
  })
  .required();

export type FormValues = {
  title: string;
  description: string;
};

const defualtValues: FormValues = {
  title: '',
  description: '',
};

export default function useDefaultValues() {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams();

  const { isLoading, todo } = useGetTodo(id as string);

  const updateTodoValues = useMemo(
    () => ({
      title: todo?.title || '',
      description: todo?.description || '',
    }),
    [todo],
  );

  const create = useMutation({
    mutationFn: (data: FormValues) =>
      todoService.create(data.title, data.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      router.replace('/');
    },
  });

  const update = useMutation({
    mutationFn: (data: FormValues) =>
      todoService.update(todo?.id, data.title, data.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      router.replace('/');
    },
  });
  const onSubmitCreate = (data: FormValues) => {
    create.mutate(data);
  };
  const onSubmitUpdate = (data: FormValues) => {
    update.mutate(data);
  };

  return {
    isLoading,
    onSubmit: id ? onSubmitUpdate : onSubmitCreate,
    defualtValues: id ? updateTodoValues : defualtValues,
    title: id ? 'Edit Todo' : 'Create Todo',
  };
}
