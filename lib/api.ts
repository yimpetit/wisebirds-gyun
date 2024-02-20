const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL; /// base url 설정을 위한 env;

// 로그인 유저 정보 호출
export async function getLoginUserInfo() {
  const response = await fetch(apiBaseUrl + "/api/auth/me");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 권한정보 호출
export async function getPermissionsInfo() {
  const response = await fetch(apiBaseUrl + "/api/auth/permissions");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 메뉴 정보 호출
export async function getMenu() {
  const response = await fetch(apiBaseUrl + "/api/menus");
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 캠페인 리스트 호출
export async function getCampaigns({
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

// 캠페인 상태 패치
export async function patchCampaign({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) {
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

// 유저 리스트 호출
export async function getUsers({
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort: string;
}) {
  const response = await fetch(
    apiBaseUrl + `/api/users?page=${page}&size=${size}&sort=${sort}`
  );
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 유저 생성
export async function createUsers({ data }: { data: TUserInputs }) {
  const response = await fetch(apiBaseUrl + "/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 유저 아이디 중복검사
export async function getUsersExists({ email }: { email: string }) {
  const response = await fetch(apiBaseUrl + `/api/users/${email}/exists`);
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}

// 유저 아이디 수정
export async function patchUsers({ id, name }: { id: number; name: string }) {
  const response = await fetch(apiBaseUrl + "/api/users/" + id, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
    }),
  });
  if (!response.ok) {
    throw new Error("네트워크 문제 발생.");
  }
  return response.json();
}
