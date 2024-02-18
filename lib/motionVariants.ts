import { Variants } from "framer-motion";

//유저 팝업 모션
export const motionUserPopup: Variants = {
  open: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
  },
  closed: {
    opacity: 0,
    y: 5,
    pointerEvents: "none",
  },
};

//셀렉트 박스 모션
export const motionSelectBoxPopup: Variants = {
  open: {
    opacity: 1,
    pointerEvents: "auto",
  },
  closed: {
    opacity: 0,
    pointerEvents: "none",
  },
};

//화살표 회전 모션
export const motionArrow: Variants = {
  down: {
    translateY: "0.125rem",
    rotateZ: 0,
  },
  up: {
    translateY: "0.125rem",
    rotateZ: 180,
  },
};

//메뉴 드롭
export const motionMenuDrop: Variants = {
  loaded: {
    y: 0,
    opacity: 1,
  },
  loading: {
    y: -50,
    opacity: 0,
  },
};

//비활성화
export const motionDisabled: Variants = {
  active: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
};

//토글버튼
export const motionToggle: Variants = {
  on: {
    x: 15,
  },
  off: {
    x: 0,
  },
};
