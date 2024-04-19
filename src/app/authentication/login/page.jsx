import Link from "next/link";
import LoginForm from "./LoginForm";
import SocialAuth from "@/components/SocialAuth";
import Image from "next/image";
import BannerImage from "../../../../public/chat-notify.svg";

export const metadata = {
  title: "Login - authentication",
  description: "This is user login page",
};

const LoginPage = ({ searchParams }) => {
  return (
    <>
      <div className="w-full p-4 max-md:order-2 md:w-1/2">
        <h4 className="text-center">Login</h4>
        <LoginForm searchParams={searchParams} />
        <SocialAuth />
        <p className="mt-2 text-center">
          Don{`'`}t have an account?
          <Link className="link" href="/authentication/register">
            register
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
