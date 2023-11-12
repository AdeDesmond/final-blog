import { connectDB } from "@/db/dbConfig/connectDB";
import { sendEmail } from "@/helpers/sendMail";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModels";

connectDB();
export async function POST(request: NextRequest) {
  const jsonBody = await request.json();

  try {
    const { name, email, password } = jsonBody;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    const user = await User.create({ name, email, password });
    //send congratulatory email to user
    await sendEmail({ email, emailType: "VERIFY", userId: user._id });
    return NextResponse.json(
      { userData: user, message: "success" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
