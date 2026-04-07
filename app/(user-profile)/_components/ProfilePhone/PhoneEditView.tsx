import { profileStyles } from '@/app/styles'
import { CircleX, Loader2, Save, Send } from 'lucide-react'
import React from 'react'

interface PhoneEditViewProps{
    isSaving: boolean;
    onCancel: ()=>void;
    onSave?: ()=>void;
    isSendingOTP: boolean;
    isVerificationMode?: boolean
}

const PhoneEditView = ({isSaving, onSave, onCancel, isSendingOTP, isVerificationMode}:PhoneEditViewProps) => {
  return (
    <div className="flex gap-2">
            <button
              onClick={onCancel}
              className={`${profileStyles.canselButton}`}
            >
              <CircleX className="h-6 w-6 mr-1" />
              Cancel
            </button>
            {!isVerificationMode && onSave && (
                <button
              onClick={onSave}
              disabled={isSaving || isSendingOTP}
              className={`${profileStyles.saveButton}`}
            >
              {isSaving ? (
                <span className="flex flex-row gap-2 items-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving
                </span>
              ) : isSendingOTP 
              ? (
                <span className="flex flex-row gap-2 items-center">
                  <Send className="w-5 h-5 animate-pulse" />
                  Sending code...
                </span>
                )
              : (
                <span className="flex flex-row gap-2 items-center">
                  <Save className="w-5 h-5" />
                  Save
                </span>
              )}
            </button>
            )}
            
          </div>
  )
}

export default PhoneEditView