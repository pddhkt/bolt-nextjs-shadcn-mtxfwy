"use server"

import { z } from "zod";
import { unauthenticatedAction } from "@/lib/safe-action";
import { rateLimitByKey } from "@/lib/limiter";
import { getAuthSessionFromHeader, setAuthCookie } from "@/lib/cookies";

const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupAction = unauthenticatedAction
  .createServerAction()
  .input(SignUpSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: "signup_attempt", limit: 5, window: 60000 }); // 5 signup attempts per minute

    console.log("Attempting to sign up with input:", input);

    try {
      const response = await fetch("http://127.0.0.1:8787/api/auth/signup", {
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
          return { error: 'Sign up failed' }
        }

        setAuthCookie(authSession)

        console.log("Sign up successful");

        return { success: true };
      } else {
        const errorData = await response.json();
        console.log("Sign up failed", errorData);
        throw new Error(errorData.error || "Sign up failed");
      }
    } catch (error : any) {
      console.error("Error during sign up:", error);
      throw new Error(error.message || "An unexpected error occurred during sign up");
    }
  });