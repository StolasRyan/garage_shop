import { AlertCircle } from 'lucide-react';

interface AlertMessageProps{
    type: 'success' | 'waring' | 'error';
    message: React.ReactNode;
}

const AlertMessage = ({type, message}: AlertMessageProps) => {

    const styles = {
        success:'bg-purple-100 text-primary',
        waring:'bg-yellow-100 text-yellow-600',
        error:'bg-red-100 text-red-600'
    }

  return (
     <div className={`flex items-center  px-3 py-2 rounded-lg mt-3 ${styles[type]}`}>
            <AlertCircle className="h-4 w-4 mr-2 shrink-0"/>
            <span className="text-sm">{message}</span>
        </div>
  )
}

export default AlertMessage