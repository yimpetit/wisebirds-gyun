[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)을 통해 부트스트랩한 [Next.js](https://nextjs.org/) **와이즈버즈 사전과제** 프로젝트입니다.

## 시작 🎬

### 개발서버 실행

```terminal

yarn install
yarn dev

# 또는

pnpm install
pnpm dev

```

브라우져에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하시면 됩니다.

**API BaseURL이 [http://localhost:3000](http://localhost:3000)로 설정되었기 때문에 포트번호 변경시 작성한 API가 정상작동이 안됩니다.**

---

![화면](https://github.com/yimpetit/wisebirds-gyun/assets/35022789/63b98a1a-4e51-4176-97e4-4abcd2947c1a)

---

### 개발 기간 🕐

2월 16일 ~ 20일 완료 (약 52시간)

---

### 구현 기능 ✅

- 메뉴 권한
- 권한 변경
- 내정보 및 팝업
- 테이블(MUI Data grid) 조회 및 페이징
- 캠페인 상태 변경
- 사용자 생성
- 사용자 수정
- 전역 에러
- 그외 기획서에 요구된 사항

### 추가 구현 기능 ➕

- 테이블 조회시 정렬 기능 추가
- 총 데이터 수 표시
- 모션 추가
- next.js의 route.ts를 사용하여 Api 호출 (제공된 API 스펙을 참고하여 임의로 개발 하였습니다.)

### 디자인 ✨

- 다크테마 컨셉으로 디자인
- 포인트 컬러는 와이즈버즈 로고 디자인에서 참고

---

### 회고 📕

처음 기획서를 보고 과제를 만만하게 보았다.<br>
그래서 진행중인 다른 프로젝트를 마저 끝내고 2일정도 늦게 시작을 했다.

익숙한 어드민 데이터 조회 기획서, 쉬워보이는 과제 때문일까<br>
이참에 새로 업데이트되거나 써보고 싶었던 라이브러리를 자신있게 설치 후 진행하였다.

만만한것도 잠시 역시나 무수히 쏟아지는 에러 화면에 정신을 차리지 못했다.<br>
특히나 framer-motion을 활용한 모션을 시도했는데<br>
데이터 테이블에 적용하는 것에 대해 많은 시도를 했지만<br>
Error와 상태 업데이트에 따른 렌더링 문제에 참패를 하고 말았다.<br>
결국 원하는 모션을 포기하고 그나마 적용한 부분이 상태 토글 버튼이나 메뉴 정도 였다.

하지만 Next.js의 route.ts를 작성하는건 꽤 재미있는 작업이였다.<br>
마치 백엔드엔드개발자가 된 느낌이랄까<br>
뭐 고작 10줄도 안되는 코드가 대부분이지만 Api를 직접 만든건<br>
항상 받는 입장이였던 나에겐 꾀나 신선한 작업이였다.

그외 디자인도 나름 신경쓰며 프로젝트를 진행한 결과<br>
내 기준 나쁘지 않은 결과물이 나온 것 같다.<br>

개발자라는 직업은 항상 공부해야 한다는걸 느낀 프로젝트였다.
