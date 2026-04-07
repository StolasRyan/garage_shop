'use client'
import AuthFormLayout from '@/app/(auth)/_components/AuthFormLayout';
import { buttonStyles, formStyles } from '@/app/styles';
import { KeyRound, Loader2, Mail } from 'lucide-react';
import React, { useState } from 'react'
import SuccessSentEmail from '../../_components/SuccessSentEmail';
import { authClient } from '@/app/lib/auth-client';



const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/email-pass-reset`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };


    if(success){
        return(
            <SuccessSentEmail email={email}/>
        )
    }
  return (
    <AuthFormLayout>
        <div className='flex flex-col gap-y-8'>
            <div className='flex flex-col items-center'>
                <KeyRound className='w-12 h-12 text-primary mb-4'/>
                <h1 className='text-2xl font-bold trext-center'>Password recovery</h1>
            </div>
            <p>Enter the E-mail you registered.</p>
            {error && (
                <div className='p-5 bg-red-100 text-red-600 rounded'>{error}</div>
            )}
            <form
            onSubmit={handleSubmit}
            className='mx-auto flex flex-col justify-center'
            autoComplete='off'
            >
                <div>
                    <label htmlFor="email" className={`${formStyles.label} text-left`}>
                        E-mail
                    </label>
                    <input 
                    type="email"
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={formStyles.input}
                    required
                     />
                </div>

                <button
                type='submit'
                disabled={isLoading}
                className={`${buttonStyles.active} rounded [&&]:w-full [&&]:h-10 [&&]:mt-8 cursor-pointer flex items-center justify-center gap-2`}
                 style={isLoading ? { backgroundColor: "##d79de0" } : {}}
                >
                    {
                        isLoading ? (
                            <>
                            <Loader2 className='animate-spin w-4 h-4'/>
                            Sending...
                            </>
                        ):(
                            <>
                                <Mail className='w-4 h-4'/>
                                Send instructions
                            </>                            
                        )
                    }
                </button>
            </form>
        </div>

    </AuthFormLayout>
  )
}

export default ForgotPasswordPage