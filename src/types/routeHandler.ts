import { NextRequest, NextResponse } from "next/server";

export type RouteHandler = (
  request: NextRequest
) => Promise<NextResponse> | NextResponse;