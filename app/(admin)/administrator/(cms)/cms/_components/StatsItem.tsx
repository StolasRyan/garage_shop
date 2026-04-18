import React from 'react'
import { getBgColor } from '../utils/getBgColor'
import { getTextColor } from '../utils/getTextColor'
import {StatItem as StatItemType } from '../types/dashboard'

interface StatsItemProps {
    stat:StatItemType
}
const StatsItem = ({stat}:StatsItemProps) => {
  return (
    <div className='p-4 rounded-lg border border-gray-100 hover:border-gray-200 duration-200'>
        <div className='flex items-center justify-center mb-2'>
            <div className={`p-2 ${getBgColor(stat.color)} rounded-lg`}>
                <div className={getTextColor(stat.color)}>{stat.icon}</div>
            </div>
            <span className={`text-2xl font-bold ${getTextColor(stat.color)}`}>
                {stat.value}
            </span>
        </div>
        <h4 className='font-medium text-gray-900'>{stat.title}</h4>
    </div>
  )
}

export default StatsItem