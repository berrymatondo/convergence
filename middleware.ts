export { auth as middleware } from "auth";
/* import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("isLoggedIn: ", isLoggedIn);
  if(!isLoggedIn)
    return null
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
 */
