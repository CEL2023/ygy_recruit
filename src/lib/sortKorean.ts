export const koreanMap: { [key: string]: number } = {
  ㄱ: 1,
  ㄲ: 2,
  ㄴ: 3,
  ㄷ: 4,
  ㄸ: 5,
  ㄹ: 6,
  ㅁ: 7,
  ㅂ: 8,
  ㅃ: 9,
  ㅅ: 10,
  ㅆ: 11,
  ㅇ: 12,
  ㅈ: 13,
  ㅉ: 14,
  ㅊ: 15,
  ㅋ: 16,
  ㅌ: 17,
  ㅍ: 18,
  ㅎ: 19,
};
export const sortKorean = (a: string, b: string) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const aChar = a.charAt(i);
    const bChar = b.charAt(i);
    if (aChar !== bChar) {
      const aVal = koreanMap[aChar];
      const bVal = koreanMap[bChar];
      if (aVal && bVal) {
        return aVal - bVal ? -1 : 1;
      } else {
        return aChar.localeCompare(bChar) ? -1 : 1;
      }
    }
  }
  return a.length - b.length ? -1 : 1;
};
