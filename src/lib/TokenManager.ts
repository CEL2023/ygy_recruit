let _cookie = "";
function setCookie(cookie: string) {
  _cookie = cookie;
  console.log(_cookie);
}
function clearCookie() {
  _cookie = "";
}
export { setCookie, clearCookie };
