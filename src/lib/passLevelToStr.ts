//0 : 작성 완료  1: 불합격 2:합격 3: 우선선발 4:최종 결정 됨
export const toPassLevelStr = (passLevel: number) => {
  switch (passLevel) {
    case 1:
      return { status: "불합격", color: "red-600" };
    case 2:
      return { status: "합격", color: "green-500" };
    case 3:
      return { status: "우선선발", color: "violet-600" };
    case 4:
      return { status: "최종선택완료", color: "orange-900" };
    case 0:
      return { status: "지원", color: "amber-200" };
    default:
      return { status: "지원", color: "amber-200" };
  }
};
