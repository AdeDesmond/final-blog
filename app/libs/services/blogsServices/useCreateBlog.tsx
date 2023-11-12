import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBlogs } from "./blogsActions";

interface PostBlog {
  title: string;
  subtitle: string;
  category: string;
  time: string | number;
  content: string;
  user_id: string | undefined;
  initialImageUrl: string;
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createBlogs,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: PostBlog) => postBlogs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
  return { createBlogs, isPending, error };
};
