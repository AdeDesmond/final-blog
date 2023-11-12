import { BookMarkedBlogs } from "@/models/bookMarkedBlogs";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const blog = await BookMarkedBlogs.deleteOne({ blog: _id });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const bookmarkedblogs = await BookMarkedBlogs.find({ user: _id })
      .populate("blog")
      .populate("user")
      .lean();
    return NextResponse.json(
      { bookMarkedData: bookmarkedblogs },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
