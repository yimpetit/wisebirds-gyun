/// 로그인 된 사용자 정보 호출
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL; /// 빠른 API base url 설정을 위한 env;

export async function getLoginUserInfo() {
  // 로그인 유저 정보 호출
  const response = await fetch(apiBaseUrl + "/api/auth/me");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

export async function getPermissionsInfo() {
  // 권한정보 호출
  const response = await fetch(apiBaseUrl + "/api/auth/permissions");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

export async function getMenu() {
  // 메뉴 정보 호출
  const response = await fetch(apiBaseUrl + "/api/menus");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

export async function getCampaigns({
  // 캠페인 리스트 호출
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort: string;
}) {
  const response = await fetch(
    apiBaseUrl + `/api/campaigns?page=${page}&size=${size}&sort=${sort}`
  );
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

export async function patchCampaign({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) {
  // 캠페인 상태 패치
  const response = await fetch(apiBaseUrl + "/api/campaigns/" + id, {
    method: "PATCH",
    body: JSON.stringify({
      enabled: enabled,
    }),
  });
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}
