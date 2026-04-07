import Image from 'next/image'
import Link from 'next/link'
const SearchButton = () => {
  return (
    <>
        <Link href='/catalog' className='truncate bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)  flex-row p-2 rounded-2xl gap-2 hidden md:flex '>
        <div className='relative w-6 h-6 hidden md:block'>
          <Image src='/menu.svg' alt='Menu' width={24} height={24} className='object-contain' sizes='24px'/>
        </div>
        
        <span className='text-base hidden md:flex'>Catalog</span>
      </Link>
    </>
  )
}

export default SearchButton