import { Comment } from "@/models/commentModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const comments = await Comment.find({ blog: _id })
      .populate({
        path: "user",
        select: "name image",
      })
      .sort({ createdAt: 1 })
      .lean();
    return NextResponse.json(
      { commentsData: comments, message: "success" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
