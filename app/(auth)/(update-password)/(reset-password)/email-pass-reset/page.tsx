"use client";

import { ErrorContent } from "@/app/(auth)/(register)/_components/ErrorContent";
import AuthFormLayout from "@/app/(auth)/_components/AuthFormLayout";
import PasswordInput from "@/app/(auth)/_components/PasswordInput";
import Tooltip from "@/app/(auth)/_components/Tooltip";
import { authClient } from "@/app/lib/auth-client";
import { isPasswordValid } from "@/utils/validation/passworValid";
import { MailWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessUpdatePassword from "../../_components/SuccessUpdatePassword";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");

    if (!queryToken) {
      setError("Incorrect link for password reset");
      return;
    }
    setToken(queryToken || "");
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const handleToStart = () => {
    router.replace("/forgot-password");
  };

  if (error && !token) {
    return (
      <AuthFormLayout>
        <ErrorContent
          title="Something went wrong."
          error={error}
          icon={<MailWarning className="h-8 w-8 text-red-500" />}
          secondaryAction={{
            label: (
              <>
                New link for
                <br />
                password reset
              </>
            ),
            onClick: handleToStart,
          }}
        />
      </AuthFormLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setError(
        "Password must be at least 6+ characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {

      if (!token) throw new Error("Incorrect link for password reset. No token.");
        

      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if(error) throw new Error(error.message);

      setSuccess(true)

      setTimeout(() => {
        router.replace("/login");
      }, 3000); 

    } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong");
    }finally{
        setLoading(false);
    }
  };

  if(success) return <SuccessUpdatePassword/>

  return (
    <AuthFormLayout>
      <h1 className="text-2xl font-bold text-center mb-8">Set new password</h1>
      {error && <Tooltip text={error} position="top" />}
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex flex-col gap-y-8 justify-center"
        autoComplete="off"
      >
        <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
          <div className="flex flex-col gap-y-4 items-start">
            <PasswordInput
              id="password"
              label="New Password"
              value={password}
              onChangeAction={handlePasswordChange}
              showPassword={showPassword}
              togglePasswordVisibilityAction={() =>
                setShowPassword(!showPassword)
              }
              showRequirements={true}
              inputClass={
                password.length > 0 && !isPasswordValid(password)
                  ? "border-red-500"
                  : ""
              }
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChangeAction={handleConfirmPasswordChange}
              showPassword={showConfirmPassword}
              togglePasswordVisibilityAction={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              showRequirements={true}
              inputClass={
                confirmPassword.length > 0 && password !== confirmPassword
                  ? "border-red-500"
                  : ""
              }
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`text-white bg-primary hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) w-full max-w-65 mx-auto p-2 gap-4 cursor-pointer duration-300 rounded ${loading ? "bg-primary/40" : "bg-(--color-primary)"}`}
        >
          {loading ? "Saving..." : "Save new password"}
        </button>
      </form>
    </AuthFormLayout>
  );
};

export default ResetPasswordPage;
