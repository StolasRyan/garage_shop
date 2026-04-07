'use client'
import { ErrorContent } from "@/app/(auth)/(register)/_components/ErrorContent";
import { useAuthStore } from "@/store/authStore";
import { MailCheck, MailWarning, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../_components/ProfileHeader";
import { Loader } from "@/app/components/Loader";
import SecuritySection from "../_components/SecuritySection";
import ProfileAvatar from "../_components/ProfileAvatar";
import '../styles.css';
import LocationSection from "../_components/LocationSection";
import ProfileEmail from "../_components/ProfileEmail";
import ProfilePhoneSettings from "../_components/ProfilePhone/ProfilePhoneSettings";
import ProfilePassword from "../_components/ProfilePassword";
import ProfileCard from "../_components/ProfileCard";

const ProfilePage = () => {
    const router = useRouter();
    const {user, isAuth, checkAuth} = useAuthStore();
    const [isChekingAuth, setIsChekingAuth] = useState(true);
    const isPhoneNumberRegistration = user?.phoneNumberVerified;


    useEffect(()=>{
      const checkingAuthentication = async () => {
        await checkAuth();
        setIsChekingAuth(false);
      }
      checkingAuthentication();
    },[checkAuth])

    useEffect(()=>{
      if(!isChekingAuth && !isAuth){
        router.replace('/')
      }
    },[isAuth, isChekingAuth, router])

    const handleToLogin =()=>{
        router.replace('/login')
    }

    const handleToRegister =()=>{
        router.replace('/register')
    }

    if(isChekingAuth) return <Loader/>

    if(!isAuth) return <Loader/>

    if(!user){
        return <ErrorContent error={'No users Data found.'}
        icon={<MailWarning className="h-8 w-8 text-red-600"/>}
        primaryAction={{label:'Enter', onClick:handleToLogin}}
        secondaryAction={{
            label:'Register',
            onClick: handleToRegister
        }}
        />;
    }

  return (
    <div className="bg-gray-50 px-4 md:px-6 xl:px-8 max-w-4xl w-full mx-auto">

        <div className="animate-slide-in opacity translate-y-8 bg-white rounded-xl shadow-xl overflow-hidden duration-700 ease-out">
         
            <ProfileHeader name={user.name} surname={user.surname}/>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {isPhoneNumberRegistration ? (
                    <>
                    <Smartphone className="h-4 w-4 mr-1"/>
                    <span>Registerd by phone</span>
                    </>
                  ):(
                    <>
                    <MailCheck className="h-4 w-4 mr-1"/>
                    <span>Registerd by email</span>
                    </>
                  )

                  }
                </div>
              </div>
              <ProfileAvatar gender={user.gender || 'male'}/>
              <LocationSection/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileEmail/>
                <ProfilePhoneSettings/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfilePassword/>
                <ProfileCard/>
              </div>
              <SecuritySection/>
            </div>
          </div>
        </div>
    
   
  );
};

export default ProfilePage;
