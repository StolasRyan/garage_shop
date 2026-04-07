import { useRouter } from "next/navigation"
import { useEffect } from "react";
import AuthFormLayout from "../../_components/AuthFormLayout";

const SuccesModal = () => {
    const router = useRouter();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            router.replace('login')
        },3000)
        return ()=> clearTimeout(timer)
    },[router])
  return (
    <AuthFormLayout>
    
            <h2 className="text-2xl font-bold text-primary mb-4">Registered successfully!</h2>
            <p className="text-lg mb-6">You will be redirected to the login page right now.</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                className="bg-primary h-2.5 rounded-full animate-[progress_3s_linear]" 
                style={{animationFillMode: 'forwards'}}
                ></div>
            </div>
    </AuthFormLayout>
  )
}

export default SuccesModal