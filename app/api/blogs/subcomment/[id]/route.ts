import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";
import { SubComment } from "@/models/subCommentsModels";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const subComments = await SubComment.find({ subcomment: _id });
    return NextResponse.json({ subCommentsData: subComments }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
