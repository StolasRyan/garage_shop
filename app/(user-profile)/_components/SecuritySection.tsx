import { buttonStyles } from '@/app/styles'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import DeleteAccountModal from './DeleteAccountModal';

const SecuritySection: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const[showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const {user, logout} = useAuthStore();



    const logoutFromProfile = () => {
        router.push('/');
    }

    const handleAppLogout = async() => {
        try {
            await logout();
            router.replace('/');
        } catch (error) {
            console.error('Error during logout:', error);
            setError('Cannot logout from application');
        }
    }

    const handleDeleteAccount = async() => {
        if(!user) return;
        
        if(user.phoneNumberVerified === true) {
            router.push('/verify-delete-phone');
        }else{
            router.push('/verify-delete-email');
        }
         
    }
    const handleOpenDeleteModal = () => {
        setError(null);
        setShowDeleteConfirm(true);
    };

    const handleCloseDeleteModal = () => {
        setError(null);
        setShowDeleteConfirm(false);
    };


  return (
    <>
    <div className='border-t pt-8'>
        <h2 className='text-2xl font-bold text-gray-600 mb-6'>Security</h2>
        {error && (
            <div className='mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded'>
                {error}
            </div>
        )}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <button
            onClick={logoutFromProfile}
            className={`${buttonStyles.active} flex flex-1 items-center justify-center h-12 bg-primary text-gray-800 px-4 py-2 rounded font-medium hover:shadow-button-cancel active:shadow-button-cancel-active duration-300 cursor-poiter`}
            >
            Exit from profile
            </button>
            <button 
            onClick={handleAppLogout}
            className='flex-1 bg-gray-200 border-none rounded flex hover:shadow-button-secondary px-4 py-2 justify-center items-center active:shadow-(--shadow-button-active) disabled:opacity-50 disabled:cursor-not-allowed h-12 text-gray-600 font-medium duration-300 cursor-pointer'>
            Exit from app
            </button>
            <button 
            onClick={handleOpenDeleteModal}
            className='bg-red-100 hover:bg-red-500 text-red-600 hover:text-white px-4 py-2 h-12 rounded font-medium duration-300 text-center cursor-pointer'>
            Delete account
            </button>
        </div>
    </div>
    <DeleteAccountModal
    isOpen={showDeleteConfirm}
    onClose={handleCloseDeleteModal}
    onConfirm={handleDeleteAccount}
    error={error}
    />
    </>
  )
}

export default SecuritySection