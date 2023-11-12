import { User } from "@/models/userModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import { NextResponse, NextRequest } from "next/server";

connectDB();
export async function PATCH(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const { password, token } = jsonBody;
    if (!password || !token) {
      return NextResponse.json(
        { error: "Invalid data or token" },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid data or user not found" },
        { status: 404 }
      );
    }
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// forgotPasswordTokenExpiry: { $gt: Date.now() },
