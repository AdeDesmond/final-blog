import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./blogsActions";
const useGetQuery = () => {
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });
  return { blogsData, isLoading, error };
};

export { useGetQuery };
