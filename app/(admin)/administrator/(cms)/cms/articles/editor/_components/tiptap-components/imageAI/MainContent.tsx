import { MainContentProps } from "../../../../types"
import ApiInfoAlert from "./ApiInfoAlert"
import ErrorPanel from "./ErrorPanel"
import PromptSection from "./PromptSection"
import ResultPanel from "./ResultPanel"
import SettingsPanel from "./SettingsPanel"
import StatusPanel from "./StatusPanel"

const MainContent = ({
    apiInfo,
prompt,
generation,
onPromptChange,
 selectedAspect,
isGenerating,
selectedStyle,
onAspectChange,
onStyleChange,
onAspectButtonClick,
elapsedSeconds,
onStyleButtonClick,
onDownload,
onInsertToEditor
}: MainContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
        <ApiInfoAlert apiInfo={apiInfo}/>
        <PromptSection
        prompt={prompt}
        onPromptChange={onPromptChange}
        isGenerating={isGenerating}
        />
        <SettingsPanel
        selectedAspect={selectedAspect}
        selectedStyle={selectedStyle}
        onAspectChange={onAspectChange}
        onStyleChange={onStyleChange}
        isGenerating={isGenerating}
        onAspectButtonClick={onAspectButtonClick}
        onStyleButtonClick={onStyleButtonClick}
        />
        {isGenerating && (
            <StatusPanel elapsedSeconds={elapsedSeconds} operationId={generation.operationId} status={generation.status}/>
        )}
        {generation.status === "success" && generation.imageUrl && (
            <ResultPanel
            imageUrl={generation.imageUrl}
            prompt={prompt}
            selectedAspect={selectedAspect}
            selectedStyle={selectedStyle}
            elapsedSeconds={elapsedSeconds}
            onDownload={onDownload}
            onInsertToEditor={onInsertToEditor}
            />
        )}
        {generation.status === "error" &&  generation.error &&(
            <ErrorPanel error={generation.error}/>
        )}
    </div>
  )
}

export default MainContent