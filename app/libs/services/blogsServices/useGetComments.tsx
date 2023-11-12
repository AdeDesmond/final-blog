import { useQuery } from "@tanstack/react-query";
import { getComments } from "./blogsActions";

const useGetComments = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(id),
  });
  return { data, error, isLoading };
};

export { useGetComments };
