"use client";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const handleLogin = async () => {
    router.push("/auth/login");
  }

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
}

export default LoginButton;
