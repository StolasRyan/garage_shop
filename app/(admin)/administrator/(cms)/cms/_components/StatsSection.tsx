import React from 'react'
import { stats } from '../utils/stats'
import StatsItem from './StatsItem'

const StatsSection = () => {
  return (
    <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>
            General statistics
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {stats.map((stat, index) => (
                <StatsItem key={index} stat={stat}/>
            ))}
        </div>
    </div>
  )
}

export default StatsSection