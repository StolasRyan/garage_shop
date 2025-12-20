import Image from 'next/image'


const SlideTwo = () => {
  return (
    <div className='mb-10 md:mb-15 xl:mb-20 h-20 md:h-40 xl:h-50 w-full relative'>
        <Image src='/images/crowd.jpeg' alt='Crowd' fill className='object-cover' loading="eager"/>
    </div>
  )
}

export default SlideTwo