'use client'
import Image from 'next/image';
import { formStyles } from '../../../styles'
import { cities } from '@/data/cities';
import { ChangeEvent } from 'react';

interface SelectCityProps {
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?:string;
  disabled?:boolean
}
const SelectCity = ({ value, onChangeAction,className ,disabled}: SelectCityProps) => {
  return (
    <div>
          <label htmlFor="location" className={formStyles.label}>
            Region
          </label>
          <div className="relative">
            <select
              id="location"
              name='location'
              value={value}
              onChange={onChangeAction}
              className={`${formStyles.input} ${className} appearance-none pr-8 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200`}
              disabled={disabled}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.label}>{city.label}</option>
              ))}
            </select>
            {!disabled && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Image
                src="/arrow-right.svg"
                alt="Choose city"
                width={24}
                height={24}
                className="rotate-90"
              />
            </div>
            )}
          </div>
        </div>
  )
}

export default SelectCity