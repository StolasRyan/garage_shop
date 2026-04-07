"use client";

import IconAvatarChange from "@/app/components/svg/IconAvatarChange";
import { useAuthStore } from "@/store/authStore";
import { getAvatarByGender } from "@/utils/getAvatarByGender";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ConfirmAvatarModal from "./ConfirmAvatarModal";
import useAvatar from "@/app/hooks/useAvatar";
import { Camera } from "lucide-react";
import CameraModal from "./CameraModal";
import { optimizeCameraPhoto } from "@/utils/optimizeImages/optimizeCameraPhoto";
import { optimazeImage } from "@/utils/optimizeImages/optimazeImage";

const ProfileAvatar = ({ gender }: { gender: string }) => {
  const { user } = useAuthStore();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    displayAvatar,
    isLoading: isUploading,
    uploadAvatar,
  } = useAvatar({ userId: user?.id, gender });

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  useEffect(()=>{
    return()=>{
        if(cameraStream){
            cameraStream.getTracks().forEach((track)=>{
                track.stop()
            })
        }
    }
  },[cameraStream])

  useEffect(()=>{
    return()=>{
        if(previewUrl && previewUrl.startsWith('blob:')){
            URL.revokeObjectURL(previewUrl)
        }
    }
  },[previewUrl])

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = getAvatarByGender(gender);
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {

        const optimizedFile = await optimazeImage(file, 128 ,0.7)

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const previewUrl = event.target.result as string;
          setPreviewUrl(previewUrl);
          setPendingFile(optimizedFile);
          setShowConfirmModal(true);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
        console.error("Image optimization error", error)
        alert('Failed to optimize image.')
    }
  };

  const handleAvatarConfirm = async () => {
    if (pendingFile) {
      setShowConfirmModal(false);
      try {
        await uploadAvatar(pendingFile);
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl("");
      } catch (error) {
        alert(error instanceof Error ? error.message : "Uploading failed");
        setPreviewUrl("");
      } finally {
        setPendingFile(null);
      }
    }
  };

  const handleAvatarCancel = () => {
    setShowConfirmModal(false);
    setPendingFile(null);

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });
      setCameraStream(stream);
      setShowCameraModal(true);
      setIsCameraReady(false);
    } catch (error) {
      console.error("Camera access error:", error);
      alert("Camera access error");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
    setIsCameraReady(false);
  };

  const handleVideoLoaded = () => {
    setIsCameraReady(true);
  };

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current && isCameraReady && user?.id) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        alert("Error of creation canvas");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const optimaizedFile = await optimizeCameraPhoto(
          canvas,
          0.7,
          128,
          user.id,
        );
        const previewUrl = URL.createObjectURL(optimaizedFile);

        setPreviewUrl(previewUrl);
        stopCamera();
        setPendingFile(optimaizedFile);
        setShowConfirmModal(true);
      } catch (error) {
        console.error("Error of photo creation", error);
        alert("Failed to make a photo");
      }
    } else {
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <Image
          src={displayAvatar}
          width={128}
          height={128}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          onError={handleImageError}
          priority
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary duration-300">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg, image/png, image/webp, image/gif"
            onChange={handleFileInputChange}
          />
          <IconAvatarChange />
        </label>
        <button
          onClick={startCamera}
          disabled={isUploading}
          className="absolute -bottom-1 left-0 bg-purple-500 text-whiite p-1.75 rounded-full cursor-pointer shadow-article hover:bg-primary duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Make photo"
        >
          <Camera className="w-6 h-6 text-white" />
        </button>

        <ConfirmAvatarModal
          isOpen={showConfirmModal}
          previewUrl={previewUrl}
          onConfirm={handleAvatarConfirm}
          isUploading={isUploading}
          onCancel={handleAvatarCancel}
        />
        <CameraModal
          isOpen={showCameraModal}
          isCameraReady={isCameraReady}
          isUploading={isUploading}
          videoRef={videoRef}
          canvasRef={canvasRef}
          onClose={stopCamera}
          onVideoLoaded={handleVideoLoaded}
          onTakePhoto={takePhoto}
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600 mb-1">
          Click on the icon to change your avatar
        </p>
        <p className="text-xs text-gray-500">
          {isUploading ? "Uploading..." : "Upload file, or make photo."}
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
