import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"], // This ensures Clerk is applied to all routes except static assets
};
// This middleware function uses Clerk to handle authentication and authorization for your Next.js application.