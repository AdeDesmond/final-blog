import { useQuery } from "@tanstack/react-query";
import { getBookMarkedBlogsByUser } from "./blogsActions";

interface Props {
  userData: {
    _id: string;
  };
}

const useGetBookMarkedBlogs = (id: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookMarkedBlogs"],
    queryFn: () => getBookMarkedBlogsByUser(id),
  });
  return { data, error, isLoading };
};

export { useGetBookMarkedBlogs };
