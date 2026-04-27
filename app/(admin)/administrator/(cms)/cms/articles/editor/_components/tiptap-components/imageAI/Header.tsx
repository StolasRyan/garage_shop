import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";
import { AlertCircle, X } from "lucide-react";
import { HeaderProps } from "../../../../types";


const Header = ({ onCloseClick, onTestAPI , isGenerating}: HeaderProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center md:justify-between px-6 py-4 border-b bg-linear-to-r from-red-50 to-yellow-50 ">
      <div className="flex flex-wrap justify-center gap-3 md:justify-between">
        <div className="flex gap-3 justify-center md:justify-between items-center">
          <Grid size="40" speed="3" color="#fb64b6" />
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 text-center">
            Image Generator
          </h2>
        </div>

        <span className="flex items-center text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
            YandexArt
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
        type="button"
        onClick={onTestAPI}
        disabled={isGenerating}
        className="text-sm h-10 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 duration-300 cursor-pointer"
        >
            <AlertCircle className="w-4 h-4 " />
            Test API
        </button>
        <button
        onClick={onCloseClick}
        disabled={isGenerating}
        className="h-10 p-2 bg-gray-200 hover:bg-white rounded-lg ml-2 duration-300 cursor-pointer"
        >
            <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Header;
