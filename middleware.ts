import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required",
      },
      { status: 401 }
    );
  }

  try {
    verifyAuthToken(token);

    return NextResponse.next();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired authentication token",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/portfolio/:path*",
    "/api/skills/:path*",
    "/api/protected/:path*",
  ],
};