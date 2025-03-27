import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({ 
  publicRoutes: ["/", "/all-products"], // Add public pages here
});

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"], // Apply middleware to all pages except Next.js internals
};