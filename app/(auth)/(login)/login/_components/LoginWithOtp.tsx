'use client'
import { LoadingContent } from '@/app/(auth)/(register)/_components/LoadingContent';
import AuthFormLayout from '@/app/(auth)/_components/AuthFormLayout';
import OTPResendCode from '@/app/(auth)/_components/OTPResendButton';
import { buttonStyles } from '@/app/styles';
import useTimer from '@/app/hooks/useTimer';
import { authClient } from '@/app/lib/auth-client';
import { CONFIG } from '@/config/config';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const LoginWithOtp = ({phoneNumber}:{phoneNumber:string}) => {
  const router = useRouter();
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(CONFIG.MAX_ATTEMPTS);
    const { timeLeft, canResend, startTimer } = useTimer(CONFIG.TIMEOUT_PERIOD);
    const {login} = useAuthStore()
  
    useEffect(() => {
      startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      if (attemptsLeft <= 0) {
        router.replace("/register");
      }
    }, [attemptsLeft, router]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (code.length !== 4) return;
        setIsLoading(true)
      try {
        const { error: verifyError } =
          await authClient.phoneNumber.verify({
            phoneNumber,
            code,
            disableSession: false,
  
            
          });
        if (verifyError) throw verifyError;

        setAttemptsLeft(CONFIG.MAX_ATTEMPTS);
          
        const response = await fetch('/api/auth/check-phone',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(phoneNumber)
        });

        if(!response.ok) throw new Error('No data found');

         await response.json()
         login()
  
        router.replace("/");
      } catch (error) {
        console.error("Verification by SMS error", error);
        setCode("");
        setAttemptsLeft((prev) => prev - 1);
  
        if (attemptsLeft <= 1) {
          setError("Verification by SMS error. Please try registrate again");
          setTimeout(() => {
            router.replace("/register");
          }, 2000);
        } else {
          setError(`Incorect code. You have ${attemptsLeft - 1} attempts left`);
        }
      }finally{
        setIsLoading(false)
      }
    };
  
    const handleResend = async () => {
      if (!canResend) return;
      try {
        await authClient.phoneNumber.sendOtp(
          { phoneNumber },
          {
            onSuccess: () => {
              startTimer();
              setError("");
              setAttemptsLeft(CONFIG.MAX_ATTEMPTS);
            },
            onError: (ctx) => {
              setError(ctx.error.message || "SMS sending error");
            },
          },
        );
      } catch (error) {
        console.error("Error while sending SMS", error);
        setError("Sending SMS error");
      }
    };

    if(isLoading){
        return(
            <AuthFormLayout>
                <LoadingContent title='Checking the code...'/>
            </AuthFormLayout>
        )
    }
  
    return (
      <AuthFormLayout>
        <div className="flex flex-col gap-y-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Enter Code
          </h1>
          <div>
            <p className="text-center text-gray-400">SMS Code</p>
  
            <form
              onSubmit={handleSubmit}
              className="w-65 mx-auto max-h-screen flex flex-col justify-center items-center"
              autoComplete="off"
            >
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                className="flex justify-center w-27.5 h-15 text-center text-2xl px-4 py-3 border border-gray-400 rounded focus:border-primary focus:shadow-(shadow-button-default) focus:bg-white focus:outline-none"
                autoComplete="one-time-code"
                required
              />
              {error && (
                <div className="text-red-500 text-center mt-2 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className={`${buttonStyles.base} ${code.length === 4 ? buttonStyles.active : buttonStyles.inactive}[&&]:mt-8 mb-0`}
                disabled={code.length !== 4 || attemptsLeft <= 0}
              >
                Confirm
              </button>
            </form>
          </div>
          <OTPResendCode
        canResend={canResend}
        timeLeft={timeLeft}
        onResendAction={handleResend}
        
        />
          <Link
            href={`/register`}
            className="h-8 text-xs text-gray-700 hover:text-black w-30 flex items-center justify-center gap-x-2 mx-auto duration-300 cursor-pointer"
          >
            <ArrowLeft size={24} /> Back
          </Link>
        </div>
      </AuthFormLayout>
    );
}

export default LoginWithOtp