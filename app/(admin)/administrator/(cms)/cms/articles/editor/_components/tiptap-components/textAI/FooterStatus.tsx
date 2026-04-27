import { RefreshCw, Send } from "lucide-react";

const FooterStatus = ({
  aiStatus,
  selectedText,
  onCancel,
  onSubmit,
  isGenerating,
  isSubmitDisabled,
  errorDetails
}: {
  aiStatus: "idle" | "loading" | "success" | "error";
  selectedText: string;
  onCancel: () => void;
  onSubmit: () => void;
  isGenerating: boolean;
  isSubmitDisabled: boolean;
  errorDetails?: string 
}) => {
  return (
    <div className="border-t p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Selected text:</span>
          <span className="ml-2">
            {selectedText === ""
              ? "No text selected"
              : `${selectedText.substring(0, 100)}...`}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isGenerating}
            className="flex-1 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium duration-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isGenerating || isSubmitDisabled}
            className="flex-1 px-5 py-2.5 bg-linear-to-r from-red-600 to-yellow-600 text-white rounded-lg hover:from-red-700 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg flex items-center gap-2 duration-300 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                YandexGPT generates...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 shrink-0" />
                Ask YandexGPT
              </>
            )}
          </button>
        </div>
      </div>
       {aiStatus !== "idle" && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            aiStatus === "loading"
              ? "bg-yellow-100 text-yellow-700"
              : aiStatus === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {aiStatus === "loading" ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>YandexGPT generating text...</span>
              </>
            ) : aiStatus === "success" ? (
              <>
                <span className="text-green-600">✓</span>
                <span>Text generated successfully!</span>
              </>
            ) : (
              <>
                <span className="text-red-600">✗</span>
                <span>YandexGPT error</span>
              </>
            )}
          </div>
          {errorDetails && (
            <div className="mt-2 text-xs font-normal">{errorDetails}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FooterStatus;
