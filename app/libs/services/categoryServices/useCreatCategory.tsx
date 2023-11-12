import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewCategory } from "./categoryActions";
const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { category: string }) => postNewCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
  return { mutate, isPending, error };
};

export { useCreateCategory };
