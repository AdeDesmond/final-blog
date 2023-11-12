import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./categoryActions";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCat,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (_id: string) => deleteCategory(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
  return { deleteCat, error, isPending };
};

export { useDeleteCategory };
