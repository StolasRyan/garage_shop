import { Wand2 } from 'lucide-react'
import React from 'react'

const ProcessInfo = () => {
  return (
    <div className='mt-6'>
        <div className='bg-white rounded-xl shadow p-6'>
            <Wand2 className='w-12 h-12 text-gray-300 mx-auto mb-4'/>
            <h3 className='font-medium text-gray-900 mb-2'>How it works?</h3>
            <ul className='text-sm text-gray-600 space-y-2'>
                <li>1. Enter article topic and choose category</li>
                <li>2. Click on &quot;Generate & Save&quot;</li>
                <li>3. AI will create professional article</li>
                <li>4. Article will be automatically saved in Data base</li>
                <li>5. You will be redirected to blog page for preview and editing</li>
            </ul>
        </div>
    </div>
  )
}

export default ProcessInfo