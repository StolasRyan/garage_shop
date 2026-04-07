'use client'

import Image from "next/image";
import { ChangeEvent } from "react";

interface CheckboxNoCardProps {
    checked: boolean | undefined,
    onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxCard = ({checked, onChangeAction, }:CheckboxNoCardProps) => {
  return (
    <div className="flex items-center gap-2">
        <label htmlFor="hasCard" className="inline-flex items-center cursor-pointer">
            <input 
            type="checkbox" 
            id="hasCard"
            checked={checked}
            onChange={onChangeAction}
            className="absolute opacity-0 w-0 h-0"
            />
            <span className={`relative w-5 h-5 border rounded flex items-center justify-center duration-300
              ${ checked ? 'bg-primary border-primary' : 'bg-gray-100 border-gray-400' }`}
            >
                {checked && (
                    <Image 
                    src='/icon-has.svg' 
                    alt={checked ? 'Has Card' : 'No Card'} 
                    width={12} 
                    height={12}
                    className="text-white"
                    />
                
                )}
            </span>
            <span className="ml-2 text-gray-500">{'I have no loyalty card'}</span>
        </label>
    </div>
  )
}

export default CheckboxCard