import { SubComment } from "@/models/subCommentsModels";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/db/dbConfig/connectDB";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();
    const { comment, blog, user, subComment } = jsonData;
    const newSubComment = await SubComment.create({
      comment,
      blog,
      user,
      subComment,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
