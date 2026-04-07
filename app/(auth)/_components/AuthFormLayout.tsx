
import { ReactNode } from "react"
import CloseButton from "./CloseButton"

type AuthFormVariant = 'default' | 'register'


const AuthFormLayout = ({children, variant = 'default'}:{children:ReactNode, variant?: AuthFormVariant}) => {
  return (
     <div className="absolute inset-0 z-100 flex items-center justify-center bg-gray-200/90 min-h-screen text-gray-800 py-10 px-3 backdrop-blur-xs">
          <div className={`${variant === 'register' ? 'max-w-171.75' : 'max-w-105'} relative bg-white rounded shadow-(--shadow-auth-form) w-full  max-h-[calc(100vh-80px)] flex flex-col px-6`}>
         
              <CloseButton/>
              <div className="pt-18 pb-10 overflow-y-auto flex-1 ">
                {children}
              </div>
      
            
          </div>
        </div> 
  )
}

export default AuthFormLayout