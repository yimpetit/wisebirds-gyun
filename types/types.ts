//로그인된 사용자 정보 타입(/api/auth/me)
type TMe = {
  id: number;
  email: string;
  name: string;
  company: {
    id: number;
    name: string;
  };
};

// 메뉴
type TMenu = {
  id: number;
  menu: string;
  role: TPermissionsState[];
  name: string;
};

// 권한 관련 타입
type TPermissionsState = "ADMIN" | "MANAGER" | "VIEWER";
type TPermissionsStateName = "어드민" | "매니저" | "뷰어";

type TPermissions = {
  id: number;
  permission: TPermissionsState;
  name: TPermissionsStateName;
};

// 캠페인 컨텐트 데이터 타입
type TCampaignDataContent = {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective:
    | "WEBSITE_CONVERSIONS"
    | "WEBSITE_TRAFFIC"
    | "SALES"
    | "APP_INSTALLATION"
    | "LEAD"
    | "BRAND"
    | "VIDEO_VIEWS";
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
};

// 캠페인 데이터 타입
type TCampaignData = {
  content: TCampaignDataContent[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: {
    target:
      | "name"
      | "enabled"
      | "campaign_objective"
      | "impressions"
      | "clicks"
      | "ctr"
      | "video_views"
      | "vtr";
    sort: "Asc" | "Desc";
  };
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};

//페이징 컴포넌트 타입
type TPaging = {
  lastPage: number;
  current: number;
  onChange: (page: number) => void;
};

// 유저 컨텐트 데이터 타입
type TUserDataContent = {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
};

// 유저 데이터 타입
type TUserData = {
  content: TUserDataContent[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: {
    target:
      | "name"
      | "enabled"
      | "campaign_objective"
      | "impressions"
      | "clicks"
      | "ctr"
      | "video_views"
      | "vtr";
    sort: "Asc" | "Desc";
  };
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};

//유저 생성 타입
type TUserInputs = {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
};

//유저 수정 타입
type TUserInputsModify = {
  id: number;
  name: string;
  email: string;
};
