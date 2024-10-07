
import { cookies } from "next/headers";

export  const getAuthSession =  () => {
  const cookieStore = cookies();
  const authSession = cookieStore.get("auth_session");

  if (!authSession) {
    return null;
  }

  return authSession.value;
};
