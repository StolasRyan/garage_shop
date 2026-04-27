import { X } from "lucide-react";
import FooterStatus from "./FooterStatus";
import { CustomPromptInput } from "./CustomPromptInput";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import QuickActionsPanel from "./QuickActionsPanel";
import { AIMenuModalProps } from "../../../../types";
import ConnectionStatus from "./ConnectionStatus";

// Default values shown



const TextAIModal = ({
  isOpen,
  onClose,
  isGenerating,
  aiStatus,
  selectedText,
  customPrompt,
  onCustomPromptChange,
  onCustomPromptAction,
  onQuickAction,
  errorDetails,
  onTestAPIAction
}: AIMenuModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-linear-to-br from-purple-700/50 to-pink-700/50 flex items-center justify-center z-100 p-4 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full overflow-hidden cursor-default select-text"
      >
        <div className="flex justify-between items-center p-6 border-b bg-linear-to-r from-red-50 to-yellow-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Quantum size="40" speed="5" color="#fb64b6" />
              <span>
                Yandex<span className="text-red-600">GPT</span>{" "}
              </span>
              Helper
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                Beta
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg duration-300 cursor-pointer"
            disabled={isGenerating}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
            <ConnectionStatus onTestApi={onTestAPIAction} isGenerating={isGenerating} /> 
          <QuickActionsPanel
            onActionClick={onQuickAction}
            isGenerating={isGenerating}
          />
          <CustomPromptInput
            disabled={isGenerating}
            onChange={onCustomPromptChange}
            prompt={customPrompt}
          />
        </div>
        <FooterStatus
          aiStatus={aiStatus}
          selectedText={selectedText}
          onCancel={onClose}
          isGenerating={isGenerating} 
          onSubmit={()=>onCustomPromptAction(customPrompt)}
          isSubmitDisabled={!customPrompt.trim()}
          errorDetails={errorDetails}
        />
      </div>
    </div>
  );
};

export default TextAIModal;
