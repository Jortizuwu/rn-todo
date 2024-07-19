import { todoService } from '@/shared/services/todo';
import { useQuery } from '@tanstack/react-query';

export const useGetTodo = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todo'],
    queryFn: () => todoService.find(id),
    enabled: !!id,
  });

  return {
    todo: data?.data,
    isLoading,
    error,
  };
};
