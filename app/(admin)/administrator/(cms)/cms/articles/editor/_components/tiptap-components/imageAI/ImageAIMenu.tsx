import { ApertureIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageAIMenuModal from "./ImageAIMenuModal";
import {
  ApiResponse,
  AspectRatio,
  EditorProps,
  GenerationRequest,
  GenerationStatus,
  StyleType,
} from "../../../../types";

const ImageAIMenu = ({ editor }: EditorProps) => {
  const [showAIImageModal, setShowAIImageModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generation, setGeneration] = useState<GenerationStatus>({
    status: "idle",
  });
  const [selectedAspect, setSelectedAspect] = useState<AspectRatio>("1:1");
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("default");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [apiInfo, setApiInfo] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (generation.status === "generating" || generation.status === "loading") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (generation.status === "idle") {
      setElapsedSeconds(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [generation.status]);

  useEffect(() => {
      if(generation.status !== 'loading' || !generation.operationId) return;

      let timeoutId : NodeJS.Timeout | null = null;
      let isMounted = true;

        const pollStatus = async () => {
            if(!isMounted) return;
            try {
                const response = await fetch(`/administrator/cms/api/articles/yandex-image?operationId=${generation.operationId}`);

            const data:ApiResponse = await response.json();

            if(data.done){
                

                if(data.imageUrl){
                    setGeneration({
                        status: 'success',
                        operationId: generation.operationId,
                        imageUrl: data.imageUrl
                    })
                }else if(data.error){
                    setGeneration({
                        status: 'error',
                        operationId: generation.operationId,
                        error: data.error
                    })
                }
            }else{
                    if(isMounted){
                        timeoutId = setTimeout(pollStatus, 3000);
                    }
                }
            } catch (error) {
                console.error('Error while polling status', error);
                if(isMounted){
                    setGeneration({
                        status: 'error',
                        operationId: generation.operationId,
                        error: 'Status check error'
                    })
                }
            }
        }

        pollStatus(); 

        return()=>{
            isMounted = false;
            if(timeoutId){
                clearTimeout(timeoutId);
            }
        }
        
  },[generation.operationId, generation.status])

  const callYandexAPI = useCallback(
    async (requestData: GenerationRequest): Promise<ApiResponse> => {
      const response = await fetch(
        "/administrator/cms/api/articles/yandex-image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        },
      );
      return await response.json();
    },
    [],
  );

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) {
      alert("Please enter description of the image");
      return;
    }
    setGeneration({ status: "generating" });
    setApiInfo("");
    try {
      const data = await callYandexAPI({
        prompt,
        aspect_ratio: selectedAspect,
        style: selectedStyle,
      });

      if (!data.success) {
        throw new Error(data.details || data.error || "Unknown error");
      }

      if (data.operationId) {
        setGeneration({
          status: "loading",
          operationId: data.operationId,
        });
        setApiInfo(`Request ID: ${data.operationId.substring(0, 20)}...`);
      } else {
        throw new Error("No operation ID");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setGeneration({ status: "error", error: errorMessage });
      alert(`Yandex ART error: ${errorMessage}`);
    }
  }, [callYandexAPI, prompt, selectedAspect, selectedStyle]);

  const handleTestApi = useCallback(async () => {
    setApiInfo("Connection test...");
    try {
      const data = await callYandexAPI({
        prompt: `Test generation: Stolas Ryan`,
        aspect_ratio: "1:1",
        style: "default",
      });

      if (data.success && data.operationId) {
        setApiInfo(
          `API connected!\n\nResponse: ${data.operationId}\n\nModel: ${data.model || "yandexgpt"}`,
        );
        alert(
          `Yandex ART API connected!\n\nResponse: ${data.operationId}\n\nModel: ${data.model || "yandexgpt"}`,
        );
      } else {
        setApiInfo(`Error: ${data.error || data.details || "Unknown error"}`);
        alert(
          `Yandex ART API error: ${data.error || data.details || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setApiInfo(`Connection error: ${errorMessage}`);
      alert(`Connection error: ${errorMessage}`);
    }
  }, [callYandexAPI]);

  const closeModal = useCallback(() => {
    setShowAIImageModal(false);
    setPrompt("");
    setGeneration({ status: "idle" });
    setApiInfo("");
    setElapsedSeconds(0);
  }, []);

  const handleAspectChange = useCallback((aspect: AspectRatio) => {
    setSelectedAspect(aspect);
  }, []);
  const handleStyleChange = useCallback((style: StyleType) => {
    setSelectedStyle(style);
  }, []);
  const handleCloseClick = () => {
    closeModal();
  };

  const handlePomptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
    },
    [],
  );

  const handleDownload = useCallback(() => {
    if (!generation.imageUrl) return;

    const link = document.createElement("a");
    link.href = generation.imageUrl;
    link.download = `yandex-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generation.imageUrl]);

  const handleInsertToEditor = useCallback(() => {
    if (generation.imageUrl && editor) {
      editor
        .chain()
        .focus()
        .setImage({
          src: generation.imageUrl,
          alt: prompt,
          title: `Generated by Yandex Art AI :${prompt}`,
        })
        .run();
      closeModal();
    }
  }, [closeModal, editor, generation.imageUrl, prompt]);

  const handleGenerateImage = useCallback(async () => {
    await generateImage();
  }, [generateImage]);

  if (!editor) return null;
  return (
    <div className="relative" onClick={(e)=>e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setShowAIImageModal(true)}
        className="px-3 py-1.5 rounded-md bg-linear-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white shadow-sm shadow-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/30 cursor-pointer duration-200 flex items-center gap-2 min-w-21.25 h-8 text-xs"
        title="Generate image with AI"
      >
        <ApertureIcon className="w-3.5 h-3.5" />
        <span>AI Image</span>
      </button>
      <ImageAIMenuModal
        isOpen={showAIImageModal}
        prompt={prompt}
        generation={generation}
        selectedAspect={selectedAspect}
        selectedStyle={selectedStyle}
        apiInfo={apiInfo}
        elapsedSeconds={elapsedSeconds}
        onClose={closeModal}
        onCloseClick={handleCloseClick}
        onAspectChange={handleAspectChange}
        onStyleChange={handleStyleChange}
        onPromptChange={handlePomptChange}
        onStyleButtonClick={() => {}}
        onDownload={handleDownload}
        onInsertToEditor={handleInsertToEditor}
        onGenerateImage={handleGenerateImage}
        onTestAPI={handleTestApi}
      />
    </div>
  );
};

export default ImageAIMenu;
