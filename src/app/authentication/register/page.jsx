import Link from "next/link";
import Image from "next/image";
import BannerImage from "../../../../public/laptop-user.svg";
import SocialAuth from "@/components/SocialAuth";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Register - authentication",
  description: "This is user register page",
};

const RegisterPage = () => {
  return (
    <>
      <div className="bg min-h-60 w-full p-2 text-center text-white md:w-1/2 md:p-6">
        <h5 className="mb-4 text-4xl font-bold">
          Create an Account with DTR-Invoice
        </h5>
        <h6 className="mb-4 text-xl font-bold">
          Get started with DTR-Invoice!
        </h6>
        <p>Fill out the form below to create your account.</p>
        <Image className="mt-10" src={BannerImage} alt="banner image" />
      </div>
      <div className="w-full p-4 md:w-1/2">
        <h4 className="text-center">Register</h4>
        <RegisterForm />
        <SocialAuth />
        <p className="mt-2 text-center">
          Do you have an account?
          <Link className="link" href="/authentication/login">
            login
          </Link>
        </p>
        <p className="text-center">
          <Link className="link" href="/">
            Go back to home
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
