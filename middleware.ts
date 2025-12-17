import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Protect specific routes:
     * - / (home route) - exact match
     * - /dashboard and all sub-routes
     * - /protected and all sub-routes
     * 
     * Note: Auth routes (/auth/*) and API routes (/api/auth/*) are automatically excluded
     */
    "/",
    "/dashboard/:path*",
    "/protected/:path*",
  ],
};

