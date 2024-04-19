import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.nextauth;

    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/authentication/login", nextUrl.pathname),
      );
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        if (token) return true;
      },
    },
  },
);

export const config = { matcher: ["/admin/:path*"] };
