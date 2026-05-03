import { Menu } from 'lucide-react'
import Link from 'next/link'
const SearchButton = () => {
  return (
    <>
        <Link href='/catalog' className='truncate bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)  flex-row p-2 rounded-2xl gap-2 hidden md:flex '>
        <div className='relative w-6 h-6 hidden md:block'>
          <Menu className='absolute top-0 left-0 w-6 h-6 text-gray-100'/>
        </div>
        
        <span className='text-base hidden md:flex text-gray-100 pr-1'>Catalog</span>
      </Link>
    </>
  )
}

export default SearchButton