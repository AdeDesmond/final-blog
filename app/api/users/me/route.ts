import { connectDB } from "@/db/dbConfig/connectDB";
import { getTokenAndVerify } from "@/helpers/getTokenAndVerify";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModels";

connectDB();
export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenAndVerify(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ userData: user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
