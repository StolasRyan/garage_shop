 import { formStyles, profileStyles } from '@/app/styles'
import { CheckCircle2, Loader2 } from 'lucide-react';
import React from 'react'

interface PhoneVerifyViewProps{
    currentPhone: string;
    code: string;
    isSaving: boolean;
    onCodeChange:(value:string)=>void;
    onVerify:()=>void;
    canResend: boolean;
    timeLeft:number;
    onResendCode:()=>void;
}
 
 const PhoneVerifyView = ({currentPhone, code, isSaving,onCodeChange, onVerify,canResend,timeLeft,onResendCode}:PhoneVerifyViewProps) => {
   return (
     <div className='mt-4 p-4 bg-purple-50 rounded'>
        <div className='flex justify-between items-center mb-3'>
            <p className='text-sm text-primary font-medium'>Verification code send to +{currentPhone}</p>
        </div>

        <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-3 justify-center'>
                <input 
                type="text"
                inputMode='numeric'
                pattern='[0-9]{4}'
                maxLength={4}
                value={code}
                onChange={(e)=>onCodeChange(e.target.value)}
                className={`${formStyles.input} [&&]:w-27.5 [&&]:bg-white block text-center`}
                autoComplete='one-time-code'
                />
                <button 
                onClick={onVerify}
                disabled={code.length !== 4 || isSaving}
                className={`${profileStyles.saveButton} [&&]:h-10 bg-primary text-white py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed`}>
                    {isSaving 
                    ?<span className='flex flex-row gap-2 items-center'><Loader2 className='h-5 w-5'/> Cheking...</span>
                    :<span className='flex flex-row gap-2 items-center'><CheckCircle2 className='h-5 w-5'/> Confirm</span>}
                </button>
            </div>
            <button
            onClick={onResendCode}
            disabled={!canResend}
            className={`px-4 py-2 rounded transition-colors ${
                canResend ? profileStyles.saveButton : profileStyles.canselButton
            }`}
            >
                {canResend ? 'Send Again' : `Retry in:${timeLeft}`}
            </button>
        </div>
     </div>
   )
 }
 
 export default PhoneVerifyView