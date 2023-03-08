export function getByte(str: string) {
  return str
    .split("")
    .map((s) => s.charCodeAt(0))
    .reduce((prev, c) => prev + (c === 10 ? 2 : c >> 7 ? 2 : 1), 0); // 계산식에 관한 설명은 위 블로그에 있습니다.
}
