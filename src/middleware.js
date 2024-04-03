import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const auth = !!req.nextauth;
    if (!auth) {
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
      },
    },
  },
);

export const config = { matcher: ["/admin/:path*"] };
