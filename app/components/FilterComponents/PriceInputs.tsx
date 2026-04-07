import { PriceInputsProps } from "@/types/priceInputsProps"

const PriceInputs = ({from,to,min,max, onFromChangeAction, onToChangeAction}:PriceInputsProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
        <input
          type="number"
          name="from"
          onChange={(e)=>onFromChangeAction(e.target.value)}
          value={from}
          min={min}
          max={max}
          placeholder={`${min}`}
          className="w-31 h-10 border border-gray-300 rounded py-2 bg-white px-4"
        />
        &mdash;
        <input
          type="number"
          name="to"
          value={to}
          onChange={(e)=>onToChangeAction(e.target.value)}
          min={min}
          max={max}
          placeholder={`${max}`}
          className="w-31 h-10 border border-gray-300 rounded py-2 bg-white px-4"
        />
      </div>
  )
}

export default PriceInputs