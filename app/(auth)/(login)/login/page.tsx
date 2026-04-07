"use client";

import React, { useState } from "react";
import AuthFormLayout from "../../_components/AuthFormLayout";
import { buttonStyles, formStyles } from "../../../styles";
import { InputMask } from "@react-input/mask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingContent } from "../../(register)/_components/LoadingContent";
import { ErrorContent } from "../../(register)/_components/ErrorContent";
import { MailWarning, PhoneOff } from "lucide-react";
import { UnverifiedEmail } from "./_components/UnverifiedEmail";
import { AuthMethodSelector } from "./_components/AuthMethodSelector";


const EnterLoginPage = () => {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [login, setLogin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnverifiedEmail, setShowUnverifiedEmail] = useState(false);
  const [showAuthMethodChoise, setShowAuthMethodChoise] = useState(false);

  const switchToEmail = () => {
    setLogin("");
    setLoginType("email");
  };

  const switchToPhone = () => {
    setLogin("");
    setLoginType("phone");
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
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
      const response = await fetch("/api/auth/check-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, loginType }),
      });

      const { exists, verified } = await response.json();

      if (!exists) {
        setError(
          loginType === "email"
            ? "No user with such E-mail"
            : "No user with such phone number",
        );
        return;
      }

      if (!verified && loginType === "email") {
        setShowUnverifiedEmail(true);
        return;
      }

      if (!verified && loginType === "phone") {
        setError("Phone number is not verified. Sign-in by E-mail");
        return;
      }

      if (loginType === "phone") {
        setShowAuthMethodChoise(true);
      } else {
        router.push(
          `/password-enter?login=${encodeURIComponent(login)}&loginType=${loginType}`,
        );
      }
    } catch (error) {
      console.error("Error while checking login", error);
      setError("Error while checking login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToRegister = () => {
    router.replace("/register");
  };

  const handleBackFromMethodChoise =()=>{
    setShowAuthMethodChoise(false);
    setLogin('');
    setLoginType('phone')
  }

  const handleAuthMethodSelect =(method: 'password' | 'otp')=>{
    const cleanLogin = login.replace(/\D/g,'');

    router.push(
        method === 'password' 
        ? `/password-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone` 
        : `/otp-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
    )
  }

  if (isLoading) {
    return (
      <AuthFormLayout>
        <LoadingContent
          title={
            <span style={{whiteSpace: 'pre-line'}}>
              {`Checking  ${loginType === "email" ? "E-mail" : "phone number"}\n${login}`}
            </span>
          }
        />
      </AuthFormLayout>
    );
  }

  if (error)
    return (
      <AuthFormLayout>
        <ErrorContent
          title="Oops, something went wrong"
          error={error}
          icon={
            loginType === "email" ? (
              <MailWarning className="h-8 w-8 text-red-600" />
            ) : (
              <PhoneOff className="h-8 w-8 text-red-600" />
            )
          }
          secondaryAction={{
            label: "Registration",
            onClick: handleToRegister,
          }}
        />
      </AuthFormLayout>
    );

  if (showUnverifiedEmail)
    return (
      <UnverifiedEmail
        email={login}
        setLoginAction={setLogin}
        setShowUnverifiedEmailAction={setShowUnverifiedEmail}
      />
    );

    if(showAuthMethodChoise) return(
        <AuthMethodSelector 
        phoneNumber={login}
        onBackAction={handleBackFromMethodChoise}
        onMethodSelectAction={handleAuthMethodSelect}
        />
    )

  return (
    <AuthFormLayout>
      <h1 className="text-2xl font-bold text-gray-600 text-center mb-8">
        Enter
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-65 mx-auto max-h-screen flex flex-col justify-center overflow-y-auto gap-y-8"
      >
        <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 relative">
          <div className="flex flex-col gap-y-4 items-start w-full">
            <div>
              <label htmlFor="login" className={formStyles.label}>
                {loginType === "email" ? "Email" : "Phone number"}
              </label>
              {loginType === "phone" ? (
                <InputMask
                  mask="+375 (__) ___-__-__"
                  replacement={{ _: /\d/ }}
                  value={login}
                  placeholder="+375 (__) ___-__-__"
                  onChange={handleLoginChange}
                  className={formStyles.input}
                  required
                />
              ) : (
                <input
                  type="email"
                  value={login}
                  placeholder="example@mail.com"
                  onChange={handleLoginChange}
                  className={formStyles.input}
                  required
                />
              )}
            </div>
            <div className="flex gap-2 text-sm mx-auto">
              <button
                type="button"
                onClick={switchToEmail}
                className={`px-2 py-1 rounded cursor-pointer ${loginType === "email" ? "bg-primary text-white" : "bg-gray-100"}`}
              >
                By E-mail
              </button>
              <button
                type="button"
                onClick={switchToPhone}
                className={`px-2 py-1 rounded cursor-pointer ${loginType === "phone" ? "bg-primary text-white" : "bg-gray-100"}`}
              >
                By phone
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={
            (loginType === "email" &&
              (!login.includes("@") || !login.includes("."))) ||
            (loginType === "phone" && login.replace(/\D/g, "").length < 12) ||
            isLoading
          }
          className={`
            ${buttonStyles.base}[&&]:my-0
            ${
              (loginType === "email" &&
                (!login.includes("@") || !login.includes("."))) ||
              (loginType === "phone" && login.replace(/\D/g, "").length < 12) ||
              isLoading
                ? "cursor-not-allowed bg-primary/40 text-white"
                : "bg-primary text-white hover:shadow-(--shadow-article)"
            } active:shadow-(--shadow-button-active)
              duration-300
            `}
        >
          Enter
        </button>
        <div className="flex flex-row flex-wrap mx-auto text-xs gap-4 justify-center">
          <Link
            href={`/register`}
            className={`${formStyles.loginLink} w-auto px-2`}
          >
            Registration
          </Link>

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

export default EnterLoginPage;
