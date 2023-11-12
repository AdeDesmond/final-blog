import { User } from "@/models/userModels";
import { sendEmail } from "@/helpers/sendMail";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/db/dbConfig/connectDB";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const jsonBody = await request.json();
    const { email } = jsonBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
