import Link from "next/link";
import LoginForm from "./LoginForm";
import SocialAuth from "@/components/SocialAuth";
import Image from "next/image";
import BannerImage from "../../../../public/chat-notify.svg";

export const metadata = {
  title: "Login - authentication",
  description: "This is user login page",
};

function errorShow(inputErrorName) {
  switch (inputErrorName) {
    case "CredentialsSignin":
      return {
        title: "Invalid user",
        description: "Email or password are invalid please recheck it.",
      };
  }
}

const LoginPage = ({ searchParams }) => {
  const authError = errorShow(searchParams.error);
  return (
    <>
      <div className="w-full p-4 max-md:order-2 md:w-1/2">
        <h4 className="text-center">Login</h4>
        {searchParams.error && (
          <div className="rounded-md border border-red-700 bg-red-800 p-2 text-center text-white">
            <h6 className="text-xl font-bold">{authError.title}</h6>
            <p>{authError.description}</p>
          </div>
        )}
        <LoginForm searchParams={searchParams} />
        <SocialAuth />
        <p className="mt-2 text-center">
          Don{`'`}t have an account?
          <Link className="link" href="/authentication/register">
            register
          </Link>
        </p>
        <p className="text-center">
          <Link className="link" href="/">
            Go back to home
          </Link>
        </p>
      </div>
      <div className="bg min-h-60 w-full p-6 text-center text-white max-md:order-1 md:w-1/2">
        <h6 className="mb-4 text-4xl font-bold">Welcome back!</h6>
        <p>
          Please enter your credentials to <br /> access your account.
        </p>
        <Image
          className="mx-auto mt-5"
          width={200}
          src={BannerImage}
          alt="banner image"
        />
      </div>
    </>
  );
};

export default LoginPage;
