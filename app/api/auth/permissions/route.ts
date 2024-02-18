export async function GET() {
  return Response.json([
    {
      id: 1,
      permission: "ADMIN",
      name: "어드민",
    },
    {
      id: 2,
      permission: "MANAGER",
      name: "매니저",
    },
    {
      id: 3,
      permission: "VIEWER",
      name: "뷰어",
    },
  ]);
}
