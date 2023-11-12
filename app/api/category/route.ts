import { NextResponse, NextRequest } from "next/server";
import { Category } from "@/models/categoryModel";
import { connectDB } from "@/db/dbConfig/connectDB";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const { category } = jsonBody;
    const categoryData = await Category.create({ category });
    return NextResponse.json({ categoryData }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 200 });
  }
}

export async function GET() {
  try {
    const categoryData = await Category.find({});
    return NextResponse.json({ categories: categoryData }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 200 });
  }
}
