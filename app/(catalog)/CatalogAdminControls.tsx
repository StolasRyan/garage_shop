import { CatalogAdminControlsProps } from '@/types/catalogAdminControlsProps'
import React from 'react'

const CatalogAdminControls = ({isEditing, handleeToogleEditing, resetLayout}:CatalogAdminControlsProps) => {
  return (
    <div className="flex justify-end mb-4">
          <button
            onClick={handleeToogleEditing}
            className="text-sm md:text-base border border-(--color-primary) hover:text-white hover:bg-[#ff6633] hover:border-transparent active:shadow-(--shadow-button-active) w-2/3 h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none"
          >
            {isEditing ? "Save changes" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={resetLayout}
              className="ml-3 p-2 text-xs justify-center items-center active:shadow-(--shadow-button-active) border-none rounded cursor-pointer transition-colors duration-300 bg-[#f3f2f1] hover:shadow-(--shadow-button-secondary)"
            >
              Reset
            </button>
          )}
        </div>
  )
}

export default CatalogAdminControls