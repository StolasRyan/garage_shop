'use client'

interface PriceFilterHeaderProps {
    onResetAction: () => void 
}
const PriceFilterHeader = ({onResetAction}:PriceFilterHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
        <p className="text-base text-black">Price</p>
        <button
          type="button"
          className="text-xs rounded bg-gray-100 h-8 p-2 cursor-pointer hover:bg-(--color-primary) hover:shadow-(--shadow-button-default) hover:text-white active:shadow-(--shadow-button-active) duration-300"
          onClick={onResetAction}
        >
          Clear
        </button>
      </div>
  )
}

export default PriceFilterHeader