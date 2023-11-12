import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./categoryActions";

const useGetCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  return { data, isLoading, error };
};

export { useGetCategories };
