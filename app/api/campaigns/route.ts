import data from "@/public/data/campaigns.json"; // 목업 데이터 가져옴
import { NextRequest } from "next/server";
import _ from "lodash";

export async function GET(request: NextRequest) {
  const getParmas = request.nextUrl.searchParams; // GET 파라미터 추출
  const page = Number(getParmas.get("page"));
  const size = Number(getParmas.get("size"));
  const sort = getParmas.get("sort")?.split(",") ?? [];
  const content = _.chunk(data, size); // 데이터를 사이즈별로 나눔
  const isLastpage = page === content.length; // 마지막 페이지 여부

  return Response.json({
    content: content[page - 1],
    total_elements: data.length,
    total_pages: content.length,
    last: isLastpage,
    number: page,
    size: size,
    sort: {
      target: sort[0],
      sort: sort[1],
    },
    number_of_elements: content[page - 1].length,
    first: page === 1,
    empty: data.length === 0,
  });
}
