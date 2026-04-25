import { Brain } from "lucide-react";
import { useState } from "react";


const TextAIMenu = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAITextModal, setShowAITextModal] = useState(false);
    const [customPrompt, setCustomPrompt] = useState("");
    const [aiStatus,setAIStatus] = useState<'idle'| 'loading' | 'success' | 'error'>("idle");
    const [errorDetails, setErrorDetails] = useState<string>('');
  return (
    <div className="relative">
        <button
        type="button"
        onClick={()=>setShowAITextModal(true)}
        className="px-3 py-1.5 rounded-md bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 cursor-pointer duration-300 flex items-center gap-2 h-8 text-xs"
        title="Open AI helper (YandexGPT)"
        >
            <Brain className="w-3.5 h-3.5"/>
            <span>AI Text</span>
        </button>
    </div>
  )
}

export default TextAIMenu