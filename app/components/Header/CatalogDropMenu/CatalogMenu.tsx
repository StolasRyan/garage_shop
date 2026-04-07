import { CatalogMenuProps } from '@/types/catalogMenuProps'
import Search from '../Search'
import ErrorComponent from '../../ErrorComponent'
import MiniLoader from '../MiniLoader'
import Link from 'next/link'

const CatalogMenu = ({
    isCatalogOpen,
  setIsCatalogOpen,
  isLoading,
  categories,
  error,
  menuRef,
  searchBlockRef,
  onMouseEnter ,
  onFocusChangeAction,

}: CatalogMenuProps) => {
  return (
       <>
      
        <div 
        className="flex items-center w-full" 
        onMouseEnter={onMouseEnter} 
        ref={searchBlockRef}>
          <Search onFocusChangeAction={onFocusChangeAction}/>
        </div>
      {isCatalogOpen && (
        <div ref={menuRef} className="hidden md:block absolute top-full left-0 w-full bg-white shadow-(--shadow-catalog-menu) z-50">
          <div className="mx-auto px-4 py-3">
            {error && <ErrorComponent error={error.error} userMessage={error.userMessage}/>}
            {isLoading ? (
              <MiniLoader/>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/catalog/${category.slug}`}
                    className="block px-4 py-2 text-gray-500 hover:text-orange-500 font-bold duration-300"
                    onClick={()=>setIsCatalogOpen(false)}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            ) : !isLoading && (
              <div className="py-2 text-center">No categories found</div>
            )}
          </div>
        </div>
      )}
</>
  )
}

export default CatalogMenu