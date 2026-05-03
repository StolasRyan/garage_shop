import { XCircle } from "lucide-react";


interface NotificationProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

const Notification = ({type, message, onClose}:NotificationProps) => {

    const baseClasses = 'mb-4 p-4 rounded absolute top-9 flex justify-between items-center';
    const typeClasses = type === 'success'
    ?'bg-green-50 text-green-800 border border-green-200'
    :'bg-red-50 text-red-800 border border-red-200'

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
        <div className="flex items-center gap-2">
             <span>{message}</span>
        </div>
        <button
        type="button"
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-label="Close notice"
        >
            <XCircle className="w-4 h-4"/>
        </button>
    </div>
  )
}

export default Notification