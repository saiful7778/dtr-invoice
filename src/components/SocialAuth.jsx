"use client";
import { DEFAULT_LOGIN } from "@/lib/routes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SocialAuth = () => {
  const handleSign = async (provider) => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN,
    });
  };
  return (
    <div className="my-2 flex items-center gap-2">
      <button
        onClick={() => handleSign("google")}
        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-green-700 p-2 font-semibold text-green-700"
      >
        <FcGoogle />
        <span>Google</span>
      </button>
    </div>
  );
};

export default SocialAuth;
