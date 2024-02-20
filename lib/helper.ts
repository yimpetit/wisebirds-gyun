// 퍼센트 변환 헬퍼
export const toRoundedPercentage = (value: number) => {
  // 소수 세 번째 자리에서 반올림
  const roundedValue = Math.round(value * 100) / 100;
  // 퍼센트 값으로 변환
  const percentageValue = roundedValue * 100;
  //   const percentageValue = roundedValue;
  // 퍼센트 형식으로 문자열 변환
  const formattedPercentage = percentageValue.toLocaleString() + "%";
  return formattedPercentage;
};
