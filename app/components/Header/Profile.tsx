import Image from 'next/image'
import React from 'react'

const Profile = () => {
  return (
    <div className='ml-6 p-2 flex flex-1 justify-end items-center gap-2.5'>
        <Image src='user.svg' alt='User' width={40} height={40} className='min-w-10 min-h-10'/>
        <p className='hidden xl:block cursor-pointer p-2.5'>User</p>
        <button className='hidden xl:block cursor-pointer p-2.5 '>
          <Image src='chevron-down.svg' alt='Logout' width={14} height={14} className='min-w-10 min-h-10'/>
        </button>
    </div>
  )
}

export default Profile