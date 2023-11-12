import { User } from "@/models/userModels";
import { connectDB } from "@/db/dbConfig/connectDB";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const { email, password } = jsonBody;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user && !(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      { message: "successfully login", userToken: token },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
