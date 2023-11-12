import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/db/dbConfig/connectDB";
import { BookMarkedBlogs } from "@/models/bookMarkedBlogs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const { userId, blogId } = jsonBody;
    const blog = await BookMarkedBlogs.create({
      user: userId,
      blog: blogId,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
