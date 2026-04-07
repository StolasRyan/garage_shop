import { buttonStyles } from '@/app/styles';
import { MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SuccessChangeEmail = ({email, newEmail}:{email:string, newEmail:string}) => {
    const router = useRouter();
  return (
    <div className='space-y-6 flex flex-col items-center'>
        <div className='flex flex-col items-center text-center space-y-4'>
            <div className='p-3 bg-primary rounded-full'>
                <MailCheck className='h-8 w-8 text-white' />
            </div>
            <div className='space-y-2'>
                <h2 className='text-2xl font-bold text-gray-900'>
                    E-mail sent.
                </h2>
                <p className='text-gray-600 max-w-md'>
                    We sent verification E-mail to old
                    <span className='font-semibold text-red-500'>{' '}{email}</span> and new
                    <span className='font-semibold text-primary'>{' '}{newEmail}</span> adresses.
                    {' '}Please, check your inbox and follow the instructions.
                </p>
            </div>
        </div>
        <div className='space-y-3 w-full'>
            <button 
            onClick={()=>router.replace('/login')}
            className={`${buttonStyles.active} px-4 py-2 rounded cursor-pointer w-full`}>
                Verificate with new E-mail
            </button>
        </div>
    </div>
  )
}

export default SuccessChangeEmail