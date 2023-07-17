import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"; //
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  //   const { pathname, origin } = req.nextUrl;
  let token = req.cookies.get("usertoken")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/login"],
};
