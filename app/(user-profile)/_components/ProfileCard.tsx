'use client'
import { formStyles, profileStyles } from "@/app/styles";
import { useAuthStore } from "@/store/authStore";
import { cleanCardNumber, formatCardNumber, isValidCardNumber } from "@/utils/validation/validProfileCard";
import { InputMask } from "@react-input/mask";
import { ArrowRight, CircleX, CreditCard, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProfileCard = () => {
  const { user, fetchUserData } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [cardNumber, setCardNumber] = useState(user?.card || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setCardNumber(user.card || "");
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
    setCardNumber(user?.card || "");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCardNumber(user?.card || "");
    setError("");
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if(!isEditing)return;

    const value = e.target.value;

    const cleanedValue = cleanCardNumber(value).slice(0,16);
    setCardNumber(cleanedValue);
  };

  const handleSave = async() => {
    const cleanedCardNumber = cleanCardNumber(cardNumber);

    if(!cleanedCardNumber.trim()){
        setError('Card number is required!')
        return;
    }
    if(!isValidCardNumber(cleanedCardNumber)){
        setError('Card number must have 16 characters!');
        return;
    }

    setIsLoading(true);
    setError('')

    try {
        const response = await fetch('/api/users/update-card',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userId: user?.id,
                cardNumber: cleanedCardNumber
            })
        });

        const data = await response.json();

        if(response.ok){
            fetchUserData();
            setIsEditing(false);
        }else{
            setError(data.error || 'Failed to update card');
        }
    } catch (error) {
        console.error(error);
        setError('Network error. Try again.')
    }finally{
        setIsLoading(false)
    }
  };

  

 
  const displayValue = formatCardNumber(cardNumber, isEditing)

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h3 className={`text-lg font-semibold text-gray-600`}>Card</h3>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className={profileStyles.editButton}
          >
            {user?.card ? "Change card" : "Add card"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className={profileStyles.canselButton}
              disabled={isLoading}
            >
              <CircleX className="h-6 w-6 mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={profileStyles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex flex-row gap-2 items-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
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
        {isEditing ? (
            <InputMask
            mask="____ ____ ____ ____"
            replacement={{ _: /\d/ }}
            value={displayValue}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className={`${formStyles.input} [&&]:w-full`}
            disabled={isLoading}
            />
        ): (
            <input 
            type="text" 
            value={displayValue || 'No card'}
            className={`${formStyles.input} [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-gray-200`}
            disabled
            readOnly
            />
        )}
        <CreditCard className="absolute right-3 top-0 transform translate-y-1/2 h-5 w-5 text-gray-400"/>
      </div>
      {error && <p className="text-red text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ProfileCard;
