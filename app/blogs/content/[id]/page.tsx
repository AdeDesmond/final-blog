"use client";
import { BiSend } from "react-icons/bi";
import { useGetComments } from "@/app/libs/services/blogsServices/useGetComments";
import { useCreateBlogComment } from "@/app/libs/services/blogsServices/useCreateBlogComment";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useGetBlogById } from "@/app/libs/services/blogsServices/useGetBlogById";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getUser } from "@/app/libs/action";
import DisplayComments from "@/components/DisplayComments";

interface Props {
  userData: {
    _id: string;
  };
}

export default function ContentPage() {
  const [test, setTest] = useState("");
  const [user, setUser] = useState<Props | null>(null);
  const [comment, setComment] = useState("");
  const {
    postComment,
    error: isCreatingCommentError,
    isPending,
  } = useCreateBlogComment();

  const params = useParams();
  const { id } = params;
  const blogContent_id = id.toString();
  const { data, error, isLoading } = useGetBlogById(blogContent_id);
  const {
    data: blogComments,
    error: blogcommentsError,
    isLoading: isLoadingBlogComments,
  } = useGetComments(blogContent_id);
  const handleSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { comment, blog: blogContent_id, user: user?.userData?._id };
    postComment(data);
    setComment("");
  };
  useEffect(() => {
    const token = Cookies.get("user");
    const fetchUser = async () => {
      if (token) {
        const res = await getUser();
        setUser(res);
      }
    };
    fetchUser();
  }, []);
  return (
    <main className="min-h-screen w-full px-10">
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="">
        {isLoading && <div>Loading...</div>}
        {data && (
          <div className="text-white flex justify-around px-10">
            <div className="w-[50%]">
              <Image
                src={data.contentData.image}
                alt={data.contentData.title}
                width={700}
                height={500}
                className="rounded-lg"
              />
              <h2 className="text-xl font-bold mb-1 mt-2">
                {data.contentData.title}
              </h2>
              <p className="text-slate-400">{data.contentData.content}</p>
            </div>
            <div className="mb-2">
              <h3>Comments</h3>
              {blogComments &&
                blogComments.commentsData?.map((comment: any) => (
                  <DisplayComments key={comment._id} comment={comment} />
                ))}
              <div className="mt-2">
                <form action="" onSubmit={handleSubmitNewComment}>
                  <div className="flex items-center border border-slate-400 max-w-fit rounded-lg overflow-hidden ">
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      name="comment"
                      id="comment"
                      placeholder="Comment..."
                      className="text-slate-300 outline-none bg-slate-900 placeholder:text-slate-400 placeholder:text-sm w-[30rem]"
                    />
                    <button type="submit">
                      <BiSend className="text-xl" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
