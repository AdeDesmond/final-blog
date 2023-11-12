import axios from "axios";

interface PostBlog {
  title: string;
  subtitle: string;
  category: string;
  time: string | number;
  content: string;
  user_id: string | undefined;
  initialImageUrl: string;
}

interface BlogProps {
  blog_id: string;
  user_id: string;
}

interface CommentProps {
  comment: string;
  blog_id: string;
  user_id: string;
}

interface SubmCommentProps {
  comment: string;
  blog_id: string;
  user_id: string;
  subComment: string;
}

interface Props {
  userData: {
    _id: string;
  };
}

const uploadBlogImage = async (formdata: FormData) => {
  try {
    const res = await axios.post("/api/blogs/upload", formdata);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const postBlogs = async (data: PostBlog) => {
  try {
    const res = await axios.post("/api/blogs", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getBlogs = async () => {
  try {
    const res = await axios.get("/api/blogs");
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const bookMarkedBlogs = async (data: BlogProps) => {
  try {
    const res = await axios.post("/api/blogs/bookmarked/", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getBookMarkedBlogsByUser = async (id: string | null) => {
  try {
    if (id === undefined) return;
    const res = await axios.get(`/api/blogs/bookmarked/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const deletebookmarked = async (id: string) => {
  try {
    const res = await axios.delete(`/api/blogs/bookmarked/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getBlogById = async (id: string) => {
  try {
    const res = await axios.get(`/api/blogs/content/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const postBlogComment = async (data: CommentProps) => {
  try {
    const res = await axios.post("/api/blogs/comment", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getComments = async (id: string) => {
  try {
    const res = await axios.get(`/api/blogs/comment/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const postSubComment = async (data: SubmCommentProps) => {
  try {
    const res = await axios.post("/api/blogs/subcomment", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export {
  postSubComment,
  getBlogById,
  getComments,
  postBlogComment,
  deletebookmarked,
  uploadBlogImage,
  postBlogs,
  getBlogs,
  bookMarkedBlogs,
  getBookMarkedBlogsByUser,
};
