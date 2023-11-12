import { useMutation, useQuery } from "@tanstack/react-query";
import { getBlogById } from "./blogsActions";

const useGetBlogById = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["blogcontent"],
    queryFn: () => getBlogById(id),
  });
  return { data, error, isLoading };
};

export { useGetBlogById };
