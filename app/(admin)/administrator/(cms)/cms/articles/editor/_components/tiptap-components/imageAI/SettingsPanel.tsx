import { AspectRatio, SettingsPanelProps, StyleType } from "../../../../types";
import { aspectRatios } from "../../../../utils/aspectRatio";
import { promptStyles } from "../../../../utils/promptStyles";

const SettingsPanel = ({
  selectedAspect,
  selectedStyle,
  onAspectChange,
  onStyleChange,
  isGenerating,
  onAspectButtonClick,
  onStyleButtonClick,
}: SettingsPanelProps) => {
  const handleAspectClick = (ratioId: AspectRatio, e: React.MouseEvent) => {
    onAspectChange(ratioId);
    if (onAspectButtonClick) {
      onAspectButtonClick(ratioId, e);
    }
  };

  const handleStyleClick = (styleId: StyleType, e: React.MouseEvent) => {
    onStyleChange(styleId);
    if (onStyleButtonClick) {
      onStyleButtonClick(styleId, e);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image format:
        </label>
        <div className="grid grid-cols-4 gap-2 align-middle">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.id}
              type="button"
              onClick={(e) => handleAspectClick(ratio.id, e)}
              disabled={isGenerating}
              title={`${ratio.label} - (${ratio.desc})`}
              className={`p-3 md:h-20 rounded-lg border flex flex-col items-center duration-300 gap-1 cursor-pointer ${
                selectedAspect === ratio.id
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "hover:bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              <span className="text-xl mb-1">{ratio.icon}</span>
              <span className="text-xs">{ratio.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image format:
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 align-middle">
          {promptStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={(e) => handleStyleClick(style.id, e)}
              disabled={isGenerating}
              title={`${style.label}`}
              className={`p-3 md:h-20 rounded-lg border flex flex-col items-center duration-300 gap-1 cursor-pointer ${
                selectedStyle === style.id
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "hover:bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              <span className={style.color}>{style.icon}</span>
              <span className="text-xs">{style.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
