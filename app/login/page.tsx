import { cookies } from "next/headers";
import LoginForm from "./_components/LoginForm";

export default async function LoginPage() {

  const cookieStore = cookies()

  //check the cookies is fresh or not
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
