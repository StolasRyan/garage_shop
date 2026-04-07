'use client';
import { ChangeEvent } from "react";
import { formStyles } from "../../../styles";
import { regions } from "@/data/reigions";
import Image from "next/image";

interface SelectRegionProps {
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?:string;
  disabled?:boolean;
}

const SelectRegion = ({ value, onChangeAction, className, disabled}: SelectRegionProps) => {
  return (
    <div>
      <label htmlFor="region" className={formStyles.label}>
        Region
      </label>
      <div className="relative">
        <select
          id="region"
          name="region"
          value={value}
          onChange={onChangeAction}
          className={`${formStyles.input} ${className} appearance-none pr-8 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200`}
          disabled={disabled}
        >
          {regions.map((region) => (
            <option key={region.value} value={region.label}>{region.label}</option>
          ))}
        </select>
        {!disabled && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Image
            src="/arrow-right.svg"
            alt="Choose region"
            width={24}
            height={24}
            className="rotate-90"
          />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SelectRegion;
