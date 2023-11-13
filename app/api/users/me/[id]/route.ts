import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModels";
import { connectDB } from "@/db/dbConfig/connectDB";

connectDB();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: _id } = params;
    const { password, image, name } = await request.json();
    const user = await User.findOne({ _id }).select("+password");
    if (!(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { message: "failure passwords are not the same" },
        { status: 400 }
      );
    }
    user.password = password;
    user.name = name;
    user.image = image;
    await user.save();
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
    const user = await User.findOne({ _id }).select("-password");
    return NextResponse.json(
      { message: "success", data: user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
