"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthFormLayout from "../../_components/AuthFormLayout";
import { LoadingContent } from "../../(register)/_components/LoadingContent";
import PasswordInput from "../../_components/PasswordInput";
import { buttonStyles } from "../../../styles";
import { authClient } from "@/app/lib/auth-client";
import Tooltip from "../../_components/Tooltip";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const EnterPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <AuthFormLayout>
          <LoadingContent title={"Requesting for a password"} />
        </AuthFormLayout>
      }
    >
      <EnterPasswordContent />
    </Suspense>
  );
};

const EnterPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginParam = searchParams.get("login") || "";
  const loginType = searchParams.get("loginType") || "";
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message.includes("Invalid password") ||
        error.message.includes("Invalid email or password")
        ? "Invalid password"
        : error.message;
    }

    return "Unknown ERROR";
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleForgotPassword =()=>{
    if(loginType === 'phone'){
        router.replace('/phone-pass-reset')
    }else{
        router.replace('/forgot-password')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (loginType === "phone") {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            phoneNumber: loginParam,
            password,
          }),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.meesage || "Entrance Error");


        login();

        router.replace("/");
      } else {
        await authClient.signIn.email(
          { email: loginParam, password },
          {
            onSuccess: () => {
             
              login();
              router.replace("/");
            },
            onError: (ctx) => {
              if(ctx.error.message.includes('Invalid email or password')){
                setError("Invalid password");
              }else{
                setError(ctx.error.message || 'Entrance error.')
              }
              
            },
          },
        );
        // router.replace('/')
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AuthFormLayout>
        <LoadingContent title={"Autorisation"} />
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout>
      <h1 className="text-2xl font-bold text-gray-600 text-center mb-8">
        Enter
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-65 mx-auto max-h-screen flex flex-col justify-center gap-y-8"
        autoComplete="off"
      >
        <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 relative">
          <div className="flex flex-col gap-y-4 items-start w-full">
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChangeAction={handleChange}
              showPassword={showPassword}
              togglePasswordVisibilityAction={() =>
                setShowPassword(!showPassword)
              }
              inputClass="h-15"
            />
            {error && <Tooltip text={error} position="top" />}
          </div>
        </div>
        <button
          type="submit"
          disabled={!password || isLoading}
          className={`${buttonStyles.base} [&&]:my-0 
          ${!password || isLoading ? buttonStyles.inactive : buttonStyles.active} my-8`}
        >
          Enter
        </button>
        <div className="flex flex-row flex-wrap mx-auto text-xs gap-4 justify-center">
          <button
            onClick={() => router.replace("/login")}
            className="h-8 text-gray-500 hover:text-black w-30 flex items-center justify-center gap-x-2 duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleForgotPassword}
            className="h-8 text-gray-500 hover:text-gray-950 w-30 flex items-center justify-center duration-300"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </AuthFormLayout>
  );
};

export default EnterPasswordPage;
