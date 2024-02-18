import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: number } }
) {
  const data = await request.json();
  return Response.json({
    result: !data.enabled,
    id: context.params.id,
  });
}
