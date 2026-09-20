import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env.local");
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function createAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET!);

  if (typeof decoded === "string") {
    throw new Error("Invalid authentication token");
  }

  return {
    userId: String(decoded.userId),
    email: String(decoded.email),
    role: String(decoded.role),
  };
}