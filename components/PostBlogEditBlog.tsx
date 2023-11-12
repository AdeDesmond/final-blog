"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinners from "./Spinners";
import { uploadBlogImage } from "@/app/libs/services/blogsServices/blogsActions";
import { useGetCategories } from "@/app/libs/services/categoryServices/useGetCategories";
import { useCreateBlog } from "@/app/libs/services/blogsServices/useCreateBlog";
import Image from "next/image";
import { getUser } from "@/app/libs/action";

interface CatProps {
  _id: string;
  category: string;
}

export default function PostBlogEditBlog({
  serviceTitle,
}: {
  serviceTitle: string;
}) {
  const { createBlogs, isPending, error: createBlogError } = useCreateBlog();
  const { data, error, isLoading } = useGetCategories();
  const [initialImageUrl, setInitialImageUrl] = useState("");
  const [userInfo, setUserInfo] = useState<{ _id: string } | undefined>();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState<number | string>("");
  const [content, setContent] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const handleBlogImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const formdata = new FormData();

    if (files) {
      setIsLoadingImage(true);
      for (let i = 0; i < files.length; i++) {
        formdata.append("file", files[i]);
      }
    }
    const res = await uploadBlogImage(formdata);
    setInitialImageUrl(res.imageUrl);
    setIsLoadingImage(false);
  };
  const handleSubmitNewBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user_id = userInfo?._id;
    const data = {
      title,
      subtitle,
      category,
      time,
      content,
      user_id,
      initialImageUrl,
    };
    createBlogs(data);
  };
  useEffect(() => {
    const userToken = Cookies.get("user");
    const fetchUser = async () => {
      if (userToken) {
        const res = await getUser();
        setUserInfo(res.userData);
      }
    };
    fetchUser();
  }, []);
  return (
    <main className="w-full">
      <form
        onSubmit={handleSubmitNewBlog}
        action=""
        className="flex flex-col justify-center w-[50%] px-6 mx-auto"
      >
        <h1 className="text-xl font-bold border-b-2 border-slate-900 mb-2  max-w-fit  text-center self-center mt-2 text-white ">
          {serviceTitle}
        </h1>
        {isPending ? (
          <Spinners />
        ) : (
          createBlogError && (
            <p className="text-red-500">{createBlogError.message}</p>
          )
        )}
        <label htmlFor="title" className="mb-1 font-semibold text-white ">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
          placeholder="Enter your title"
          className=" text-black h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm mb-2 shadow-sm"
        />
        <label htmlFor="subtitle" className="mb-1 font-semibold text-white ">
          Subtitle
        </label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          type="text"
          name="subtitle"
          id="subtitle"
          placeholder="Enter your subtitle"
          className="h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm mb-2 shadow-sm"
        />

        <div className="w-full flex gap-x-4">
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="category"
              className="mb-1 font-semibold text-white "
            >
              Categories
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
              className="w-[10rem] h-8 bg-white rounded-lg focus:ring focus:ring-slate-900 focus:ring-offset-0"
            >
              {isLoading ? (
                <option value="loading">Loading...</option>
              ) : (
                data?.categories?.length > 0 &&
                data?.categories?.map((cat: CatProps) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))
              )}
            </select>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="time" className="mb-1 font-semibold text-white ">
              Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              name="time"
              id="time"
              className="w-[10rem] h-8 bg-white rounded-lg focus:ring focus:ring-slate-900 focus:ring-offset-0"
            >
              <option>Time</option>
              <option value="5">5mins</option>
              <option value="10">10mins</option>
              <option value="15">15mins</option>
              <option value="20">20mins</option>
              <option value="25">25mins</option>
            </select>
          </div>
        </div>
        <label htmlFor="content" className="mb-1 font-semibold text-white ">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
          id="content"
          placeholder="Enter your content"
          className=" h-24 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm mb-2 shadow-sm"
        />
        <label htmlFor="image" className="mb-1 font-semibold text-white ">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleBlogImage}
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-slate-700
      hover:file:bg-violet-100"
        />
        {isLoadingImage ? (
          <Spinners />
        ) : (
          initialImageUrl && (
            <Image
              src={initialImageUrl}
              alt="blog image"
              className="w-16 h-16 rounded-lg hover:shadow-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out mt-3 object-cover"
              height={100}
              width={100}
            />
          )
        )}
        <button className="text-white">Submit</button>
      </form>
    </main>
  );
}
