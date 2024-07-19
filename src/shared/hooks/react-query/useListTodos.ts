import { todoService } from '@/shared/services/todo';
import { useQuery } from '@tanstack/react-query';

export const useListTodos = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoService.list(),
  });

  return {
    todos: data?.data ?? [],
    isLoading,
    error,
  };
};
