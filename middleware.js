import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/all-products"], // Add public pages here
});

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"], // Apply middleware to all pages except Next.js internals
};
