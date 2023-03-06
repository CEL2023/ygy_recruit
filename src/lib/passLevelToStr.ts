//0 : 작성 완료  1: 불합격 2:합격 3: 우선선발 4:최종 결정 됨
export const toPassLevelStr = (passLevel: number) => {
  switch (passLevel) {
    case 1:
      return { status: "서류 탈락" };
    case 2:
      return { status: "지필고사 응시 가능" };
    case 3:
      return { status: "지필고사 탈락" };
    case 4:
      return { status: "면접 응시 가능" };
    case 5:
      return { status: "면접 탈락" };
    case 6:
      return { status: "일반 선발" };
    case 7:
      return { status: "우선 선발" };
    case 0:
    default:
      return { status: "작성됨/지원됨" };
  }
};
