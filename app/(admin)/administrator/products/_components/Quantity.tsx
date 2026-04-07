import { formStyles } from "@/app/styles";
import React from "react";

interface QuantityProps {
  quantity: string;
  onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Quantity = ({ quantity, onChangeAction }: QuantityProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Quantity <span className="text-red-700">*</span>
      </label>
      <input
        type="number"
        name="quantity"
        required
        value={quantity}
        onChange={onChangeAction}
        className={`${formStyles.input} bg-white [&&]:w-full`}
      />
    </div>
  );
};

export default Quantity;
