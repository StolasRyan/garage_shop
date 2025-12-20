import Image from 'next/image'
import React from 'react'

const SlideOne = () => {
  return (
    <div className='relative overflow-hidden flex justify-center h-20 md:h-40 xl:h-50 bg-gray-800'>
        <div className='absolute inset-0 bg-white/30'></div>
        <div className='flex flex-row gap-x-2 xl:gap-x-4 items-center z-10 relative'>
            <div className='relative hidden md:block md:w-50 md:h-33 xl:w-75 xl:h-50 top-7'>
                <Image src='/images/pink.png' alt='Wave' fill loading="eager" sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'/>
            </div>
            <h2 className='text-lg md:text-2xl xl:text-5xl font-bold text-pink-200'>Free delivery from 100$</h2>
        </div>
    </div>
  )
}

export default SlideOne