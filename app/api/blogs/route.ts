import { Blog } from "@/models/blogsModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();
export async function POST(request: NextRequest) {
  const jsonBody = await request.json();
  try {
    const {
      title,
      time,
      subtitle,
      content,
      category,
      user_id,
      initialImageUrl,
    } = jsonBody;
    const blog = await Blog.create({
      title,
      time,
      subtitle,
      content,
      category,
      author: user_id,
      image: initialImageUrl,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await Blog.find({})
      .populate({
        path: "author",
        select: "name image",
      })
      .populate({
        path: "category",
        select: "category",
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ blogsData: blogs }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
