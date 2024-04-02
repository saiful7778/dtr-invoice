import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login - authentication",
  description: "This is user login page",
};

const LoginPage = () => {
  return (
    <>
      <h4 className="text-center">Login</h4>
      <LoginForm />
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
