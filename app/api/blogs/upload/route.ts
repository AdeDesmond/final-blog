import { NextRequest, NextResponse } from "next/server";
import { uploadBlogImage } from "@/helpers/uploadBlogImage";

export async function POST(request: NextRequest) {
  try {
    const formdata = await request.formData();
    const file = formdata.get("file");
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    const imageData = await uploadBlogImage(file);
    return NextResponse.json({ imageUrl: imageData }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
