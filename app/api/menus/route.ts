export async function GET() {
  return Response.json([
    {
      id: 1,
      menu: "CAMPAIGNS",
      role: ["ADMIN", "MANAGER", "VIEWER"],
      name: "캠페인",
    },
    {
      id: 2,
      menu: "USERS",
      role: ["ADMIN"],
      name: "사용자",
    },
  ]);
}
