import { type NextRequest, NextResponse } from "next/server";
import { ISignInUser } from "./pages/signin";
const url =
  process?.env?.NODE_ENV === "production"
    ? process?.env?.NEXT_PUBLIC_BASE_URL ?? "https://api.kghigh.com"
    : "http://localhost:3000";
const clienturl =
  process?.env?.NODE_ENV === "production"
    ? "https://kghigh.com"
    : "http://localhost:3001";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    new RegExp(/^.*(fonts|_next|vk.com|favicon|public).*$/).test(request.url) ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  const access_token = request.cookies.get("access_token");
  const refresh_token = request.cookies.get("refresh_token");
  const response = NextResponse.next();
  if (pathname.includes("/me") && (!access_token || !refresh_token))
    return NextResponse.redirect(clienturl + "/signin");
  if (pathname.includes("/signin") && access_token)
    return NextResponse.redirect(clienturl + "/");
  if (pathname.includes("/find-my-pwd") && access_token)
    return NextResponse.redirect(clienturl + "/");
  if (access_token) {
    response.headers.set("isLoggedIn", "true");
    return response;
  }
  if (!refresh_token) {
    response.headers.set("isLoggedIn", "false");
    return response;
  }
  try {
    const rs = await fetch(new URL(`${url}/api/v1/auth/refresh`), {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `refresh_token=${refresh_token.value}`,
      },
    });
    const res: ISignInUser = await rs?.json();
    const setCookie = rs.headers.get("Set-Cookie");
    if (!setCookie) {
      response.headers.set("isLoggedIn", "false");
      return response;
    }
    if (res.tokens.accessToken) {
      response.headers.set("Set-Cookie", setCookie!);
      response.headers.set("isLoggedIn", "true");
      return response;
    }
  } catch (_error) {
    response.headers.set("isLoggedIn", "false");
    try {
      await fetch(new URL(`${url}/api/v1/auth/signout`));
    } catch (e) {}

    return response;
  }
  response.headers.set("isLoggedIn", "true");
  return response;
}
