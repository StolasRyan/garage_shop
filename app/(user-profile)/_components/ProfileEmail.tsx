"use client";
import AuthFormLayout from "@/app/(auth)/_components/AuthFormLayout";
import { formStyles, profileStyles } from "@/app/styles";
import { authClient } from "@/app/lib/auth-client";
import { CONFIG } from "@/config/config";
import { useAuthStore } from "@/store/authStore";
import {CircleX, Edit, Loader2, Mail, Save } from "lucide-react";
import { useEffect, useState } from "react";
import SuccessChangeEmail from "./SuccessChangeEmail";
import AlertMessage from "./AlertMessage";

const ProfileEmail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, fetchUserData } = useAuthStore();

  const isTempEmail = user?.email?.endsWith(CONFIG.TEMPORARY_EMAIL_DOMAIN);
  const hasNoEmail = !user?.email || user.email.trim() === "" || isTempEmail;
  const isPhoneregistered = user?.phoneNumberVerified === true;

  useEffect(() => {
    if (user) {
      setEmail(isTempEmail ? "" : user.email || "");
    }
  }, [isTempEmail, user]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('')
  };

  const handleCancel = () => {
    setEmail(isTempEmail ? "" : user?.email || "");
    setIsEditing(false);
    setError('')
  };

  const handleSave = async() => {
    if(!user)return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    const currentDisplayEmail = isTempEmail ? "" : user.email || "";
    if (email === currentDisplayEmail) {
      setError('New email is the same as the current email');
      return;
    }
    setIsSaving(true);
    setError('');

    try {
        if(isPhoneregistered){
            await updateEmailDirectly()
        }else{
            const response = await authClient.changeEmail({
                newEmail: email,
                callbackURL: '/login'
            });

            if(response.error){
                if( response.error.code === 'COULDNT_UPDATE_YOUR_EMAIL'){
                    throw new Error("This email is already in use");
                }else{
                    throw new Error(response.error.message || "Failed to update email");
                }
            }
            setShowSuccess(true);
            setIsEditing(false);
        }
    } catch (error) {
        console.error('Failed to update email',error);
        if(error instanceof Error){
            setError(error.message);
        }else{
            setError("Unknown error happened while updating email");
        }
    }finally{
        setIsSaving(false);
    }
  };

  const updateEmailDirectly=async()=>{
    const response = await fetch('/api/auth/update-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email , userId: user?.id }),
            });

            const data = await response.json();

            if(!response.ok){
                setError(data.error);
                return;
            }

            await fetchUserData();
            alert('Email updated successfully');
            setIsEditing(false);
  }

if(showSuccess){
    return(
        <AuthFormLayout>
            <SuccessChangeEmail email={user?.email || ''}  newEmail={email}/>
        </AuthFormLayout>
    )
}

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-600">E-mail</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`${profileStyles.editButton}`}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className={`${profileStyles.canselButton}`}
            >
              <CircleX className="h-6 w-6 mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`${profileStyles.saveButton}`}
            >
              {isSaving ? (
                <span className="flex flex-row gap-2 items-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving
                </span>
              ) : (
                <span className="flex flex-row gap-2 items-center">
                  <Save className="w-5 h-5" />
                  Save
                </span>
              )}
            </button>
          </div>
        )}
      </div>
     
      <div className="relative">
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`${formStyles.input} [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-gray-200`}
          placeholder="Enter your E-mail"
          disabled={!isEditing}
        />
        <Mail className="absolute right-3 top-0 transform translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
       {hasNoEmail && !isEditing &&(
        <AlertMessage type='waring' message='Reccomend to add your E-mail.'/>
      )}
      {isEditing && isPhoneregistered &&(
       <AlertMessage type='success' message='You can change your E-mail without verification.'/>
      )}
      {isEditing && !isPhoneregistered &&(
        <AlertMessage type='waring' message='To change E-mail needed verification on bouth adresses.'/>
      )}
      {error &&(
        <AlertMessage type='error' message={error}/>
      )}
    </div>
  );
};

export default ProfileEmail;
