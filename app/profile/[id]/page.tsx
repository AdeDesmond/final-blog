"use client";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { uploadUserPhoto, updateUser, getUser } from "@/app/libs/action";
import Image from "next/image";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [image, setImage] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [userData, setUserData] = React.useState<{
    userData: {
      _id: string;
      name: string;
      email: string;
      isVerified: boolean;
      isAdmin: boolean;
      __v: number;
      image: string;
    };
  } | null>(null);
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    const res = await uploadUserPhoto(formData);
    setImage(res.imageData);
  };
  const handleUpdateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, password, image };
    if (password !== confirmPassword) {
      return alert("Password and Confirm Password must be the same");
    }
    await updateUser(id, data);
    setName("");
    setImage("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(function () {
    const token = Cookies.get("user");
    const fetchUsers = async () => {
      if (token) {
        const res = await getUser();
        setUserData(res);
      }
    };
    fetchUsers();
  }, []);
  return (
    <main className="w-full min-h-screen">
      <div className="bg-slate-500 w-[40%] h-[35rem] mx-auto my-10 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-xl border-b-2 border-slate-900 text-white ">
          User Profile
        </h1>
        <form
          action=""
          className="flex flex-col gap-y-1 px-6"
          onSubmit={handleUpdateInfo}
        >
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="user photo"
                width={100}
                height={100}
                className="h-16 w-16 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 mt-4 object-cover "
              />
            </div>
          )}
          {userData && (
            <div>
              {
                <div>
                  <Image
                    src={userData?.userData.image}
                    alt={userData.userData.name}
                    width={100}
                    height={100}
                    className="h-16 w-16 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 mt-4 object-cover "
                  />
                </div>
              }
            </div>
          )}
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="w-full h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Confirm your password"
            className="w-full h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
          />
          <label htmlFor="image">Proile Photo</label>
          <input
            onChange={handleUploadPhoto}
            type="file"
            name="image"
            id="image"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-slate-700
      hover:file:bg-violet-100"
          />
          <button className="bg-slate-900 px-10 py-2 self-center rounded-lg text-white shadow-md hover:bg-slate-700 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold">
            Update Information
          </button>
        </form>
      </div>
    </main>
  );
}
