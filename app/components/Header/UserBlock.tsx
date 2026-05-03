import React from 'react'
import Profile from './Profile'
import TopMenu from './TopMenu'

const UserBlock = () => {
  return (

      <nav aria-label="Main Menu">
    <div className='h-14 md:h-auto bg-gray-100/90 md:bg-transparent  fixed bottom-0 left-0 right-0 md:static flex flex-row justify-between items-center w-full px-4 py-2 [box-shadow:var(--shadow-default)] md:shadow-none text-[8px] md:text-[12px] z-50'>
      <TopMenu/>
      <Profile/>
    </div>
    </nav>
  )
}

export default UserBlock