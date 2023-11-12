import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/helpers/uploadFiles";

export async function POST(request: NextRequest) {
  try {
    const files = await request.formData();
    const file = files.get("file");
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    if (file) {
      const imageUrl = await uploadFile(file);
      return NextResponse.json({ imageData: imageUrl }, { status: 200 });
    }
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
