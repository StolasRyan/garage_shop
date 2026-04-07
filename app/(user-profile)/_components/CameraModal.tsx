import { Camera } from "lucide-react";
import React from "react";

interface CameraModalProps {
  isOpen: boolean;
  isCameraReady: boolean;
  isUploading: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onClose:()=>void;
  onVideoLoaded:()=>void;
  onTakePhoto:()=>void;
}

const CameraModal = ({
  isOpen,
  isCameraReady,
  isUploading,
  videoRef,
  canvasRef,
  onClose,
  onVideoLoaded,
  onTakePhoto,
}: CameraModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-4 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-center">Make photo</h3>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedData={onVideoLoaded}
            muted
            className="w-full h-full bg-gray-200 rounded mb-4 mx-auto"
          />
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden"/>
          <div className="flex gap-3 w-full text-xs md:text-sm">
            <button
            onClick={onTakePhoto}
              disabled={!isCameraReady || isUploading}
              className="flex-1 text-white px-3 bg-purple-500 hover:bg-primary hover:shadow-button-default active:shadow-button-active cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed duration-300"
            >
              <div className="flex flex-row gap-x-2 md:gap-x-4 justify-center items-center">
                <Camera className="w-6 h-6 text-white" />
                {isCameraReady ? "Make a photo" : "Loading..."}
              </div>
            </button>
            <button
              onClick={onClose}
              disabled={isUploading}
              className="flex-1 bg-[#f3f2f1] border-none rounded flex hover:shadow-button-secondary p-2 justify-center items-center active:shadow-button-active cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
          {!isCameraReady && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Camera lauching...
          </p>
        )}
      </div>
    </div>
  );
};

export default CameraModal;
