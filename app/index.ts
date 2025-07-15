import { createCookie } from "react-router";

export const authCookie = createCookie("sessionToken", {
  path: "/",
  sameSite: "lax",
  secure: false,
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 60,
});
