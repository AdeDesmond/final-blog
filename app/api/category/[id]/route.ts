import { Category } from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig/connectDB";

connectDB();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cat = await Category.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "successfully deleted" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
