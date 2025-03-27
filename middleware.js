import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Ensure middleware runs for API routes and protected pages
export const config = {
  matcher: ["/((?!.+\\..+|_next).*)", "/"], // Matches all API routes and pages
};
