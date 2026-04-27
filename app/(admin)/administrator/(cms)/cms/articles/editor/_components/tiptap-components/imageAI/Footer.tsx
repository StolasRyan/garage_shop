import { AlertCircle, Check, Clock, RefreshCw, Sparkles } from "lucide-react";
import { FooterProps } from "../../../../types"
import { formatTime } from "../../../../utils/formatTime";


const Footer = ({
    generationStatus,
    elapsedSeconds,
    prompt,
    onCloseClick,
    onInsertToEditor,
    onGenerateImage
}: FooterProps) => {
    const isGenerating = generationStatus === "generating" || generationStatus === "loading";
    const isCompleted = generationStatus === "success";

    const renderStatusMessage = ()=>{
        switch(generationStatus){
            case "idle":
                return "Enter description to generate image";
            case 'generating':
                return "Starting YandexART...";
            case 'loading':
                return(
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>YandexArt:{formatTime(elapsedSeconds)}</span>
                    </div>
                );
            case 'success':
                return(
                    <span className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        Ready!
                    </span>
                );
            case 'error':
                return(
                    <span className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        Error
                    </span>
                );
            default: 
                return null;
        }
    }
  return (
    <div className="border-t px-6 py-4 bg-gray-50">
        <div className="flex flex-wrap flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 text-gray-500">
                {renderStatusMessage()}
            </div>

            <div className="flex flex-wrap flex-col md:flex-row justify-center gap-3">
                <button
                onClick={onCloseClick}
                disabled={isGenerating}
                className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium duration-300 cursor-pointer"
                >
                    {isCompleted ? "Close" : "Cancel"}
                </button>

                {isCompleted ? (
            <button
              onClick={onInsertToEditor}
              className="flex-1 px-6 py-2.5 bg-linear-to-r from-red-600 to-yellow-600 text-white rounded-lg hover:from-red-700 hover:to-yellow-700 font-medium flex items-center gap-2 duration-300 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Insert in document
            </button>
          ) : (
            <button
              onClick={onGenerateImage}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1 px-6 py-2.5 bg-linear-to-r from-red-600 to-yellow-600 text-white rounded-lg hover:from-red-700 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 duration-300 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  YandexART working...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 shrink-0" />
                  Create image
                </>
              )}
            </button>
          )}
            </div>
        </div>
    </div>
  )
}

export default Footer