 import { AlertCircle } from 'lucide-react'
 
 const ConnectionStatus = ({isGenerating, onTestApi}:{isGenerating: boolean; onTestApi: () => void}) => {
   return (
     <div className='mb-4 p-3 bg-green-50 rounded-lg border border-green-200'>
        <div className='flex items-center justify-between'>
            <div className='text-sm text-green-800'>
                <strong className='flex items-center gap-2'> 
                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                    YandexGPT is connected
                </strong>
            </div>
            <button
            onClick={onTestApi}
            disabled={isGenerating}
            className='text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center gap-2 disabled:opacity-50 duration-300 cursor-pointer'
            >
                <AlertCircle className="w-4 h-4 shrink-0" />
                    Test connection
            </button>
        </div>
     </div>
   )
 }
 
 export default ConnectionStatus