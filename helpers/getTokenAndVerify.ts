import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const getTokenAndVerify = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("user")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { getTokenAndVerify };
