import Image from 'next/image'
const SearchButton = () => {
  return (
    <>
        <button className='bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active)  flex-row p-2 rounded-2xl gap-3 hidden md:flex'>
        <Image src='menu.svg' alt='Search' width={24} height={24} className='hidden md:block'/>
        <span className='text-base hidden md:block'>Catalogue</span>
      </button>
    </>
  )
}

export default SearchButton