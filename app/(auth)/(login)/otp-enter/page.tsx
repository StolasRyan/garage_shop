'use client'
import { ErrorContent } from '@/app/(auth)/(register)/_components/ErrorContent';
import { LoadingContent } from '@/app/(auth)/(register)/_components/LoadingContent';
import AuthFormLayout from '@/app/(auth)/_components/AuthFormLayout';
import { authClient } from '@/app/lib/auth-client';
import { PhoneOff } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import  { useEffect, useRef, useState } from 'react'
import LoginWithOtp from '../login/_components/LoginWithOtp';

const OTPLoginPage = () => {
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get('login') || '';
    const [status, setStatus] = useState<'sending' | 'sent' | 'error'>('sending');
    const [error, setError] = useState('');
    const isSentRef = useRef(false);


    useEffect(()=>{
        const sendOTP=async()=>{
            if(isSentRef.current || !phoneNumber) return;

            isSentRef.current = true;

            try {
                await authClient.phoneNumber.sendOtp(
                    {phoneNumber},
                    {
                        onSuccess:()=>{
                            setStatus('sent')
                        },
                        onError:(ctx)=>{
                            setStatus('error')
                            setError(ctx.error?.message || 'Error while sending SMS');
                            isSentRef.current = false
                        }
                    }
                )
            } catch (error) {
                setStatus('error');
                setError(error instanceof Error ? error.message : 'Unknown Error');
                isSentRef.current = false;
            }
        }
        sendOTP();
    },[phoneNumber]);

    const handleRetry = () =>{
         setStatus('sending');
         setError('')
         isSentRef.current = false;

    }

    if(status === 'sending'){
        return (
            <AuthFormLayout>
                <LoadingContent
                title={`Sending SMS on phone number: +${phoneNumber}`}
                />
            </AuthFormLayout>
        )
    }

    if(status === 'error'){
        return(
            <AuthFormLayout>
                <ErrorContent 
                error={error} 
                icon={<PhoneOff 
                className='w-8 h-8 text-red-500'/>}
                primaryAction={{
                    label: 'Try Again',
                    onClick: handleRetry
                }}
                />
            </AuthFormLayout>
        )
    }

  return (
    <LoginWithOtp phoneNumber={phoneNumber}/>
  )
}

export default OTPLoginPage