'use client';
import { ErrorProps } from "@/types/errorProps";



const ErrorComponent = ({error, userMessage}: ErrorProps) => {
    console.error('Error has been declared', error)
  return (
    <div className="m-4 p-4 bg-red-100 text-red-800 rounded text-center">
        <p>{userMessage || 'Error. Maybe try later'}</p>
        <button onClick={()=>window.location.reload()}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
        >
            Try again
        </button>
    </div>
  )
}

export default ErrorComponent