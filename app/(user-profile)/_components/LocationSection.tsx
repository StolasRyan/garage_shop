import SelectCity from "@/app/(auth)/(register)/_components/SelectCity";
import SelectRegion from "@/app/(auth)/(register)/_components/SelectRegion";
import { profileStyles } from "@/app/styles";
import { useAuthStore } from "@/store/authStore";
import { CircleX, Edit, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ProfileFormData {
  region: string;
  location: string;
}

const LocationSection = () => {
  const { user, fetchUserData } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving]=useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    region: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        region: user.region || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, region: e.target.value }));
    setIsEditing(true);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
    setIsEditing(true);
  };

  const handleCancel =()=>{
    setFormData({
        region:user?.region || '',
        location:user?.location || ''
    });
    setIsEditing(false)
  }

  const handleSave = async()=>{
    if(!user?.id) return;
    setIsSaving(true)
    try {
        const response = await fetch('/api/auth/location',{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userId: user.id,
                region: formData.region,
                location: formData.location,
            })
        })
        if(!response.ok){
            throw new Error('Saving error')
        }
        await fetchUserData();
        setIsEditing(false);
    } catch (error) {
        console.error('Error while saving', error)
        alert('Failed to save changes')
    }finally{
        setIsSaving(false)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-600">Location</h3>
        {!isEditing ? (
          <button
          onClick={()=>setIsEditing(true)}
            className={`${profileStyles.editButton}`}
          >
            <Edit className='h-4 w-4 mr-1'/>
                Edit
          </button>
        ) : (
          <div className="flex gap-2 w-full md:w-auto">
            <button 
            onClick={handleCancel}
            className={`${profileStyles.canselButton}`}>
            <CircleX className='h-6 w-6 mr-1'/>
              Cancel
            </button>
            <button 
            onClick={handleSave}
            className={`${profileStyles.saveButton}`}>
              {isSaving 
              ? <span className="flex flex-row gap-2 items-center">
                <Loader2 className="w-4 h-4 animate-spin"/>Saving</span> 
              : <span className="flex flex-row gap-2 items-center">
                <Save className="w-5 h-5"/>Save</span>}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectRegion
          value={formData.region}
          onChangeAction={handleRegionChange}
          className="w-full"
          disabled={!isEditing}
        />
        <SelectCity
          value={formData.location}
          onChangeAction={handleCityChange}
          className="w-full"
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default LocationSection;
