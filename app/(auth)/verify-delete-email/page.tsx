'use client'
import React, { useState } from "react";
import AuthFormLayout from "../_components/AuthFormLayout";
import { Loader2, Mail, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const VerifyDeleteByEmailPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading]=useState(false);
    const [success, setSuccess]=useState(false);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const {error} = await authClient.deleteUser({
                callbackURL:'/goodbye'
            });

            if(error){
                throw new Error(error.message)
            }
            setSuccess(true);
            router.replace('/')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error occured');
        }finally{
            setLoading(false)
        }
    };

     if (success) {
    return (
      <AuthFormLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Check your E-mail</h1>
          <p>We send E-mail wit instructions on your adress.</p>
        </div>
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center">
          <Trash className="w-12 h-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-center">Delete account</h1>
        </div>
        <p className="text-center">
          For verify deleting account we send E-mail with instructions on yours
          adress.
        </p>
        {error && (
            <div className="p-5 bg-red-200 text-red-600 rounded">{error}</div>
        )}
        <form 
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center"
        autoComplete="off"
        >
            <button
            type="submit"
            disabled={loading}
            className="flex-1 flex flex-row items-center justify-center gap-x-3 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 h012 rounded font-medium duration-300 text-center cursor-pointer disabled:bg-yellow-100"
            >
                {
                    loading ? 
                    (<>
                        <Loader2 className="animate-spin w-4 h-4"/>
                        Sending...
                        </>
                    ):(
                        <>
                        <Mail className="w-4 h-4 shrink-0"/>
                        Send confirmation
                        </>
                    )
                }
            </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default VerifyDeleteByEmailPage;
