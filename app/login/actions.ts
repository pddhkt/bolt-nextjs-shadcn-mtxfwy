"use server"

import { z } from "zod";
import { cookies } from "next/headers";
import { unauthenticatedAction } from "@/lib/safe-action";
import { rateLimitByKey } from "@/lib/limiter";
import { getAuthSessionFromHeader, setAuthCookie } from "@/lib/cookies";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: "login_attempt", limit: 5, window: 60000 }); // 5 login attempts per minute

    console.log("Attempting to login with input:", input);

    try {
      const response = await fetch("http://127.0.0.1:8787/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

  if (response.ok) {
    const setCookieHeader = response.headers.get('Set-Cookie')
    const authSession = getAuthSessionFromHeader(setCookieHeader)
    
    if (!authSession) {
      return { error: 'Login failed' }
    }

        setAuthCookie(authSession)

        console.log("Login successful");

        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("An unexpected error occurred during login");
    }
  });