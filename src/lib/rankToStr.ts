//부장 5 권한위임-부장급 4 권한위임-차장급 2 차장 3 일반부원 1 지원자 0 사무국장 9

export const toRankString = (rank: number) => {
  switch (rank) {
    case 0:
      return "지원자";
    case 1:
      return "부원";
    case 2:
    case 3:
      return "차장";
    case 4:
    case 5:
      return "부장";
    case 9:
      return "사무국장";
    default:
      return "지원자";
  }
};
