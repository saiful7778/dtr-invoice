import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register - authentication",
  description: "This is user register page",
};

const RegisterPage = () => {
  return (
    <>
      <h4 className="text-center">Register</h4>
      <RegisterForm />
      <p className="mt-2 text-center">
        Do you have an account?
        <Link className="link" href="/authentication/login">
          login
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
