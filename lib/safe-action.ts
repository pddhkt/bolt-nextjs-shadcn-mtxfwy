// "use server";

import { createServerActionProcedure } from "zsa";
import { PublicError } from "./errors";
import { cookies } from "next/headers";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = process.env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "錯誤",
      message: `${err.message}`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });

// export const authenticatedAction = createServerActionProcedure()
//   .experimental_shapeError(shapeErrors)
//   .handler(async () => {
//     const cookieStore = cookies();

//     const authSession = cookieStore.get("auth_session");

//     if (!authSession) {
//       return { error: "User is not authenticated" };
//     }
//     return {
//       session: authSession.value,
//     };
//   });
