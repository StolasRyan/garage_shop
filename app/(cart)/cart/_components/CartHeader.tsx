

const CartHeader = ({itemCount, title}:{itemCount:number, title:string}) => {
  return (
    <div className='relative w-81.5 h-24'>
        <h1 className='text-4xl md:text-5xl xl:text-[64px] font-bold mb-8 md:mb-10 xl:mb-15'>
            {title}
        </h1>
        {itemCount > 0 &&(
            <div className="absolute ml-5 -top-4 right-23 md:right-1 xl:right-0 bg-primary rounded px-2 py-1">
          <span className="text-base text-white">{itemCount}</span>
        </div>
        )}
    </div>
  )
}

export default CartHeader