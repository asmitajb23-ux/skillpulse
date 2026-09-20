import { NextResponse } from "next/server";

export interface HealthCheckResponse {
  success: boolean;
  message: string;
}

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  const body: HealthCheckResponse = {
    success: true,
    message: "SkillPulse API is running",
  };

  return NextResponse.json(body);
}
