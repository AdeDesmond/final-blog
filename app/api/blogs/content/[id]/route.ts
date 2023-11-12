import { Blog } from "@/models/blogsModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const blog = await Blog.findOne({ _id })
      .populate({
        path: "author",
        select: "name image",
      })
      .populate({
        path: "category",
        select: "category",
      })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(
      { contentData: blog, message: "success" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
