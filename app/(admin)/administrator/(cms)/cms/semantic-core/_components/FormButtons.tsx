import Link from 'next/link';
import React from 'react'

interface FormButtonsProps {
  saving: boolean;
  disabled?: boolean;
}

const FormButtons = ({saving, disabled=false}: FormButtonsProps) => {
  return (
    <div className='flex gap-3 pt-4 border-t'>
        <button
        type='submit'
        disabled={saving || disabled}
         className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors'>
            {saving ? 'Saving...' : 'Save settings'}
        </button>
        <Link
        href='/administrator/cms'
        className='px-4 py-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors'
        >
            Back to administrator panel
        </Link>
    </div>
  )
}

export default FormButtons