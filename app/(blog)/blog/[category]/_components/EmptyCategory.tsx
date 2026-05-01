import React from 'react'

const EmptyCategory = () => {
  return (
    <div className='text-center text-gray-600 py-12'>
        <div className='inline-block p-8 bg-gray-50 rounded-2xl mb-6'>
            <h2 className='text-2xl font-bold mb-4'>
                No articles in this category yet
            </h2>
            <p>Try later or look another categories</p>
        </div>
    </div>
  )
}

export default EmptyCategory