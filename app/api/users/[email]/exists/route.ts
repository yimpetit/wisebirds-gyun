import { NextRequest } from "next/server";
import _ from "lodash";
import data from "@/public/data/users.json"; // 목업 데이터 가져옴

export async function GET(
  request: NextRequest,
  context: { params: { email: string } }
) {
  const exists = _.find(data, { email: context.params.email });

  return Response.json({
    result: exists ? true : false,
  });
}
