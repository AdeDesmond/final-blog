import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookMarkedBlogs } from "./blogsActions";

const useBookMarkedBlog = () => {
  const queryClient = useQueryClient();
  const {
    mutate: bookedMarkedBlog,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => bookMarkedBlogs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookMarkedBlogs", "comments", "blogs", "blogcontent"],
      });
    },
  });

  return { bookedMarkedBlog, isPending, error };
};

export { useBookMarkedBlog };
