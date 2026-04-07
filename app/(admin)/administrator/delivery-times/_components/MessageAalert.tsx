import React from 'react'

interface MessageAalertProps {
    message: string;
    type: 'success' | 'error'
}
const MessageAalert = ({message, type}: MessageAalertProps) => {
  return (
    <div
    className={`p-3 md:p-4 mb-4 rounded border ${
        type === 'success'
        ? 'bg-lime-100 text-lime-600 border-lime-300'
        : 'bg-red-100 text-red-600 border-red-300'
    }`}
    >
        {message}
    </div>
  )
}

export default MessageAalert