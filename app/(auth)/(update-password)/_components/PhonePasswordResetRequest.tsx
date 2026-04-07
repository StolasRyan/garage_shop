'use client';
import { authClient } from "@/app/lib/auth-client";
import React, { useState } from "react";
import AuthFormLayout from "../../_components/AuthFormLayout";
import { KeyRound, Loader2, Smartphone } from "lucide-react";
import { buttonStyles, formStyles } from "../../../styles";
import { InputMask } from "@react-input/mask";


interface PhonePasswordResetRequestProps {
  onSuccessAction: (phone: string) => void;
  loading: boolean;
  setLoadingAction: (loading: boolean) => void;
  error: string | null;
  setErrorAction: (error: string | null) => void;
}

const PhonePasswordResetRequest = ({
  onSuccessAction,
  loading,
  setLoadingAction,
  error,
  setErrorAction,
}: PhonePasswordResetRequestProps) => {
    const [phone, setPhone] = useState('');

    const handleRequestReset = async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoadingAction(true);
        setErrorAction(null);
        try {
            const {error: resetError} = await authClient.phoneNumber.requestPasswordReset({
                phoneNumber: phone.replace(/\D/g, '')
            })
            if(resetError){
                if(resetError.message?.toLocaleLowerCase().includes("isn't registered")){
                    throw new Error('Phone number is not registered')
                }
                throw new Error(resetError.message || 'Failed to send the code.');
            }
            onSuccessAction(phone);
        } catch (error) {
            setErrorAction((error as Error).message);
        }finally{
            setLoadingAction(false);
        }
    }

  return (
    <AuthFormLayout>
        <div className="flex flex-col gap-y-6">
            <div className="flex flex-col items-center">
                <KeyRound className="w-12 h-12 text-primary mb-4"/>
                <h1 className="text-2xl font-bold text-center">
                    Reset Password
                </h1>
            </div>
            <p className="text-center ">
                Enter your phone number to receive a code to reset your password.
            </p>
            {error && (
                <div className="p-3 bg-red-100 text-red-600 rounded text-sm">
                    {error}
                </div>
            )}
            <form
            onSubmit={handleRequestReset}
            className="flex flex-col gap-y-4 mx-auto"
            >
                <div>
                    <label htmlFor="phone" className={formStyles.label}>
                        Phone Number
                    </label>
                    <InputMask
                    mask="+375 (__) ___-__-__"
                    replacement={{_: /\d/}}
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    placeholder="+375 (__) ___-__-__"
                    className={formStyles.input}
                    required
                    />
                </div>
                <button
                type="submit"
                disabled={loading}
                className={`${buttonStyles.active} rounded [&&]:w-full [&&]:h-10 cursor-pointer flex items-center justify-center gap-2`}
                >
                    {loading ? (
                        <>
                        <Loader2 className="animate-spin w-4 h-4"/>
                        Sending...
                        </>
                    ):(
                        <>
                        <Smartphone className="w-4 h-4"/>
                        Send code 
                        </>
                    )

                    }
                </button>
            </form>
        </div>
    </AuthFormLayout>
  );
};

export default PhonePasswordResetRequest;
