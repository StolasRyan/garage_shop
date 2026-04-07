import { formStyles } from "@/app/styles";

interface SkuProps {
    sku: string;
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Sku = ({sku ,onChangeAction}:SkuProps) => {
  return (
    <div>
        <label className='block text-sm font-medium mb-2'>
            SKU <span className='text-red-700'>*</span>
        </label>
        <input 
        type="number" 
        name='sku'
        min={0}
        max={999999}
        required
        value={sku}
        onChange={onChangeAction}
        className={`${formStyles.input} bg-white [&&]:w-full`}
        />
    </div>
  )
}

export default Sku