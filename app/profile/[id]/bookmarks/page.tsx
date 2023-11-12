"use client";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import DisplayBookMarked from "@/components/DisplayBookMarked";
import { useGetBookMarkedBlogs } from "../../../libs/services/blogsServices/useGetBookMarkedBlogs";

import React, { useEffect } from "react";
import { getUser } from "../../../libs/action";

interface Props {
  userData: {
    _id: string;
  };
}

export default function BookMarksPage() {
  const [user, setUser] = React.useState<Props | undefined>();
  const { id } = useParams();
  const { data, error, isLoading } = useGetBookMarkedBlogs(id.toString());
  console.log(user?.userData?._id);
  useEffect(function () {
    const token = Cookies.get("user");
    const fetchUser = async () => {
      if (token) {
        const res = await getUser();
        setUser(res);
      }
    };
    fetchUser();
  }, []);
  if (data === null) return <div>Loading...</div>;
  return (
    <main className="w-full min-h-screen grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-5 px-5">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data?.bookMarkedData?.map((bookMarkedItem: any) => (
        <DisplayBookMarked
          key={bookMarkedItem._id}
          bookMarkedItem={bookMarkedItem}
        />
      ))}
    </main>
  );
}
