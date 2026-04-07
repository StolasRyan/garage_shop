'use client'
import { formStyles, profileStyles } from '@/app/styles';
import { useAuthStore } from '@/store/authStore'
import { ArrowRight, Key, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ProfilePassword = () => {
    const {user, logout} = useAuthStore();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isPhoneRegistered = user?.phoneNumberVerified === true;

    const handlePasswordChangeClick = ()=>{
        setIsModalOpen(true)
    }

    const handleConfirm = async()=>{
        setIsModalOpen(false);

        await logout();

        if(isPhoneRegistered){
            router.replace('/phone-pass-reset')
        }else{
            router.replace('/forgot-password')
        }
    };

    const handleCansel=()=>{
        setIsModalOpen(false)
    }
    const getModalText = ()=>{
        return isPhoneRegistered 
        ? 'For password change, to you will be sent SMS code for verification. You will be replaced from your account. Confirm?'
        : 'For password change, to you will be sent E-mail with instructions on your adress. You will be replaced from your account. Confirm?'
    }
  return (
    <div className='mb-8'>
        <div className='flex flex-wrap justify-between items-center mb-4 gap-4'>
            <h3 className='text-lg font-semibold text-gray-600'>Password</h3>
            <button 
            onClick={handlePasswordChangeClick}
            className={profileStyles.editButton}>
                Change Password
                <ArrowRight className='h-4 w-4 ml-1'/>
            </button>
        </div>

        <div className={`relative`}>
            <input 
            type="text" 
            value={`********`}
            className={`${formStyles.input} [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-gray-100`}
            disabled
            readOnly
            />
            <Key className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'/>
        </div>
        {isModalOpen && (
            <div className='absolute inset-0 z-100 flex items-center justify-center  bg-gray-100 min-h-screen text-gray-900 py-10 px-3 backdrop-blur-sm'>
                <div className='relative bg-white rounded shadow-auth-form) max-h-[calc(100vh-80px)] w-full flex flex-col p-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Password change confirm</h3>
                        <button
                        onClick={handleCansel}
                        className='text-gray-400 hover:text-gray-600 duration-300 p-1 rounded-full hover:bg-gray-100 cursor-pointer'
                        >
                        <X className='h-5 w-5'/>
                        </button>
                    </div>
                    <p className='text-gray-600 mb-6'>{getModalText()}</p>
                    <div className='flex gap-3 justify-end'>
                        <button
                        onClick={handleCansel}
                        className={profileStyles.canselButton}
                        >
                            Cansel
                        </button>
                        <button
                        onClick={handleConfirm}
                        className={profileStyles.saveButton}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProfilePassword