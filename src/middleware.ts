import { type NextRequest, NextResponse } from "next/server";
import { ISignInUser } from "./pages/SignIn";

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
  if (access_token) {
    response.headers.set("isLoggedIn", "true");
    return response;
  }
  if (!refresh_token) {
    response.headers.set("isLoggedIn", "false");
    return response;
  }
  try {
    const rs = await fetch(
      new URL("http://localhost:3000/api/v1/auth/refresh"),
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `refresh_token=${refresh_token.value}`,
        },
      }
    );
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
      await fetch(new URL("http://localhost:3000/api/v1/auth/signout"));
    } catch (e) {}

    return response;
  }
  response.headers.set("isLoggedIn", "true");
  return response;
}
