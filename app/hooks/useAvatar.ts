import { useAuthStore } from "@/store/authStore";
import { getAvatarByGender } from "@/utils/getAvatarByGender";
import { useCallback, useEffect, useState } from "react";

interface UseAvatarProps {
  userId?: string;
  gender?: string;
}

const useAvatar = ({ userId, gender = "male" }: UseAvatarProps) => {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserData } = useAuthStore();


  const getDisplayAvatar = useCallback(() => {
    return currentAvatar || getAvatarByGender(gender);
  },[currentAvatar, gender]);

  const loadAvatar = useCallback(async () => {
    if (!userId) {
      setCurrentAvatar(getAvatarByGender(gender));
      return;
    }
    setIsLoading(true);

    try {
      const respose = await fetch(`/api/auth/avatar/${userId}?t=${Date.now()}`);
      if (respose.ok) {
        const blob = await respose.blob();

        if (blob.size > 0) {
          const avtarUrl = URL.createObjectURL(blob);
          setCurrentAvatar(avtarUrl);
          return;
        }
      }
      setCurrentAvatar(getAvatarByGender(gender));
    } catch (error) {
      console.error("Error loading avatar:", error);
      setCurrentAvatar(getAvatarByGender(gender));
    } finally {
      setIsLoading(false);
    }
  },[userId, gender]);

    useEffect(()=>{
    loadAvatar()
  },[loadAvatar])

  useEffect(()=>{
    return()=>{
    if(currentAvatar && currentAvatar.startsWith('blob:')){
        URL.revokeObjectURL(currentAvatar);
    }}
  },[currentAvatar])


  const uploadAvatar = useCallback(async (file: File) => {
    if (!userId) throw new Error("User ID not found");
    if (!file.type.startsWith("image/")) throw new Error("Invalid file type");
    if (file.size > 5 * 1024 * 1024)
      throw new Error("File size too large, max 5MB");

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);

      const response = await fetch("/api/auth/upload-avatar", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Loading failed");
      }

      await loadAvatar();
      await fetchUserData();
      return true;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  },[fetchUserData, loadAvatar, userId]);
  return {
    avatar: currentAvatar,
    displayAvatar: getDisplayAvatar(),
    isLoading,
    uploadAvatar,
    loadAvatar,
    getDisplayAvatar,
  };
};
export default useAvatar;
