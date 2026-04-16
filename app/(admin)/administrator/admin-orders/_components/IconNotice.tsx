import React from 'react'

const IconNotice = ({unreadMessagesCount}: {unreadMessagesCount: number}) => {
  return (
    <div className='absolute top-1 right-1.25'>
        <div className='w-3 h-3 bg-primary rounded-full flex items-center justify-center text-[8px] text-white'>
            {unreadMessagesCount}
        </div>
    </div>
  )
}

export default IconNotice