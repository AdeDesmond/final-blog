import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBlogComment } from "./blogsActions";

const useCreateBlogComment = () => {
  const queryClient = useQueryClient();
  const {
    mutate: postComment,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: any) => postBlogComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "blogs", "blogcontent"],
      });
    },
  });
  return { postComment, error, isPending };
};

export { useCreateBlogComment };
