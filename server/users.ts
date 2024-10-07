'use server'

import { cache } from "react";
import { getAuthSession } from "./cookies";

export const getUserInfo = cache(async () => {
  const authSession =  getAuthSession();

  if (!authSession) {
    return { error: "User is not authenticated" };
  }

  try {
    const response = await fetch(`http://127.0.0.1:8787/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authSession}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to get user information" };
    }
  } catch (error) {
    console.error("Error when getting user information:", error);
    return { error: "An unexpected error occurred" };
  }
})
