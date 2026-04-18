import React from 'react'
import { SiteSettings } from '../../types/siteSettings'

const CurrentSettings = ({settings}: {settings: SiteSettings}) => {
  return (
    <div className='p-4 bg-gray-50 rounded-lg'>
        <h3 className='font-medium text-gray-900 mb-2'>Current settings:</h3>
        <div className='text-sm text-gray-600 space-y-1'>
            <div>
                <strong>
                    Banner:
                </strong>{settings.siteTitle}
            </div>
            <div>
                <strong>
                    Keywords:
                </strong>{settings.siteKeywords.length || 0}
            </div>
            <div>
                <strong>
                    Themes:
                </strong>{settings.semanticCore.length|| 0}
            </div>
            <div>
                <strong>
                    Last updates:
                </strong>{new Date(settings.updatedAt).toLocaleDateString('ru-RU')}
            </div>
        </div>
    </div>
  )
}

export default CurrentSettings