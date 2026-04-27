import { AlertCircle } from 'lucide-react'
import { ErrorPanelProps } from '../../../../types'

const ErrorPanel = ({error}:ErrorPanelProps) => {
  return (
    <div className='mb-6 p-6 bg-red-50 rounded-xl border border-red-200'>
        <div className=' flex items-center gap-4'>
            <AlertCircle className='w-12 h-12 text-red-600'/>
            <div>
                <p className='text-xl font-bold text-red-800'>YandexART Error</p>
                <p className='text-sm text-red-600 mt-1'>{error}</p>
                <p className='text-xs text-red-500 mt-2'>
                    Try again later
                </p>
            </div>
        </div>
    </div>
  )
}

export default ErrorPanel