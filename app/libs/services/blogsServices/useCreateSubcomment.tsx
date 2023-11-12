import { useMutation } from "@tanstack/react-query";
import { postSubComment } from "./blogsActions";

const useCreateSubcomment = () => {
  const {
    mutate: postingSubcomment,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: any) => postSubComment(data),
  });
  return { postingSubcomment, error, isPending };
};

export { useCreateSubcomment };
