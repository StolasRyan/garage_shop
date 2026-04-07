import React from 'react'
import AuthFormLayout from '../../_components/AuthFormLayout'
import { CheckCircle } from 'lucide-react'

const SuccessUpdatePassword = () => {
  return (
    <AuthFormLayout>
        <div className='max-w-md mx-auto mt-10 p-6 text-center'>
            <CheckCircle className='w-16 h-16 text-primary mx-auto mb-4'/>
            <h1 className='text-2xl font-bold mb-4 text-primary'>Password changed successfully</h1>
            <p className='text-gray-600'>You will be redirected to the login page...</p>
        </div>
    </AuthFormLayout>
  )
}

export default SuccessUpdatePassword