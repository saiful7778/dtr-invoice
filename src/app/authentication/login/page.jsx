import Link from "next/link";
import LoginForm from "./LoginForm";
import SocialAuth from "@/components/SocialAuth";

export const metadata = {
  title: "Login - authentication",
  description: "This is user login page",
};

const LoginPage = ({ searchParams }) => {
  return (
    <>
      <h4 className="text-center">Login</h4>
      <LoginForm searchParams={searchParams} />
      <SocialAuth />
      <p className="mt-2 text-center">
        Don{`'`}t have an account?
        <Link className="link" href="/authentication/register">
          register
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
