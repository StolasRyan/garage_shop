import { getBonusesWord } from '@/utils/bonusWord'
import { BadgeRussianRuble } from 'lucide-react'
import React from 'react'

const Bonuses = ({bonus}:{bonus:number}) => {
    const roundedBonus = Math.round(bonus) 
    const bonusWord = getBonusesWord(roundedBonus)
  return (
    <div className='w-53 flex flex-row gap-x-2 items-center justify-center mx-auto mb-2'>
        <BadgeRussianRuble className='w-4 h-4 text-primary'/>
        <p className='text-xs text-primary'>
            You get{' '}
            <span className='font-bold'></span>
            {roundedBonus} {bonusWord}
        </p>
    </div>
  )
}

export default Bonuses