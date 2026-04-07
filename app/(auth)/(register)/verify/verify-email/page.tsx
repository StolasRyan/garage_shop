"use client";

import AuthFormLayout from "@/app/(auth)/_components/AuthFormLayout";
import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { authClient } from "@/app/lib/auth-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingContent } from "../../_components/LoadingContent";
import { ErrorContent } from "../../_components/ErrorContent";
import { MailWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import { SuccessSent } from "../../_components/SuccessSent";

const VerifyEmailPage = () => {
    const router = useRouter();
  const { regFormData } = useRegFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const hasSentInitialRequest = useRef(false);

  const verifyAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!regFormData) throw new Error("E-mail required");

      await authClient.signUp.email(
        {
          ...regFormData,
          email: regFormData.email || "",
          callbackURL: "/verify/verify-success",
        },
        {
          onSuccess: () => {
            setVerificationSent(true);
            setIsLoading(false);
          },
          onError: (ctx) => {
            setIsLoading(false);
            setVerificationSent(false);

            const errorMessage = ctx.error.message || "Unknown error";

            if (errorMessage.includes("already exists")) {
              setError("E-mail already exists");
            } else {
              setError(errorMessage);
            }
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      setVerificationSent(false);
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  },[regFormData]);

  useEffect(()=>{
    if(!hasSentInitialRequest.current && regFormData.email){
        hasSentInitialRequest.current = true;
        verifyAccount();
    }
  },[verifyAccount, regFormData.email])

  const handleToLogin = ()=>router.replace('/login');
  const handleResend = ()=> verifyAccount();

  return (
    <AuthFormLayout>
        {isLoading 
        ? (<LoadingContent title="Sending E-mail"/>) 
        : error 
        ? (<ErrorContent 
            error={error} 
            icon={<MailWarning className="h-8 w-8 text-red-600"/>}
            primaryAction={{label:'Enter', onClick: handleToLogin}}
            secondaryAction={{label:'Try Again', onClick: handleResend}}
            />)
        : verificationSent 
        ? (<SuccessSent/>) : null}
    </AuthFormLayout>
  )
};

export default VerifyEmailPage;
