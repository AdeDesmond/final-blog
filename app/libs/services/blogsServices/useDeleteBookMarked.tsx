import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletebookmarked } from "./blogsActions";

const useDeleteBookMarked = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBookMarkedById,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => deletebookmarked(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookMarkedBlogs", "blogs"],
      });
    },
  });
  return { deleteBookMarkedById, isPending, error };
};

export { useDeleteBookMarked };
