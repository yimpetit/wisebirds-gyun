import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: { email: number } }
) {
  return Response.json({
    result: true,
    id: context.params.email,
  });
}
