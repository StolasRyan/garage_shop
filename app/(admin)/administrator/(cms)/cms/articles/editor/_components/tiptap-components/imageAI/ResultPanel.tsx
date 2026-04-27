
import { ResultPanelProps } from "../../../../types";
import { Download } from "lucide-react";
import Image from "next/image";
import { promptStyles } from "../../../../utils/promptStyles";
import { formatTime } from "../../../../utils/formatTime";

const ResultPanel = ({
  imageUrl,
  selectedAspect,
  selectedStyle,
  elapsedSeconds,
  onDownload,
}: ResultPanelProps) => {
  return(
    <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Result:</h3>
            <div className="flex gap-2">
                <button
                type="button"
                onClick={onDownload}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 duration-300 cursor-pointer"
                >
                    <Download className="w-4 h-4 " />
                    Download
                </button>
            </div>
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 p-4">
            <Image
            src={imageUrl}
            alt="Generated image with YandexGPT"
            width={1024}
          height={1024}
          className="w-full h-auto max-h-100 object-contain mx-auto rounded-lg"
          onError={()=>{console.error('Failed to generate image')}}
            />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
        Style: {promptStyles.find((s) => s.id === selectedStyle)?.label} |
        Format: {selectedAspect} | Generation time: {formatTime(elapsedSeconds)}
      </p>
    </div>
  )
};

export default ResultPanel;
