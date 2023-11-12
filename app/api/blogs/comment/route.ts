import { Comment } from "@/models/commentModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();
    const { comment, blog, user } = jsonData;
    const newComment = await Comment.create({
      comment,
      blog,
      user,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
