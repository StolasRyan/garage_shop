import React from 'react'

const ProfileHeader = ({name, surname}:{name: string, surname: string}) => {
  return (
    <div className="bg-linear-to-r from-primary to-gray-400 px-6 py-8 text-white">
              <h1 className="text-3xl font-bold">User Profile:{name} {surname}</h1>
              <p className="mt-2 opacity-90">Yours profile controls</p>
            </div>
  )
}

export default ProfileHeader