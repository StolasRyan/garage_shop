import { useCategoryStore } from "@/store/categoryStore";
import { Loader2, Save, XCircle } from "lucide-react";
import { SubmitSectionProps } from "../types";

const SubmitSection = ({ onCancel}:SubmitSectionProps) => {
  const {editingId, isSubmitting, isUploading} = useCategoryStore();
  return ( 
    <>
      {isSubmitting && (
        <div className="mt-4 pt-3 bg-blue-50 text-blue-600 rounded text-sm">
          <div className="fle items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {editingId ? "Updating category..." : "Creating category..."}
          </div>
        </div>
      )}
      <div className="flex gap-3 mt-6 ">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex items-center gap-1 px-4 py-2.5 bg-primary text-white rounded hover:shadow-button-default active:shadow-button-active cursor-pointer duration-300"
        >
          <Save className="w-4 h-4" />
          {isSubmitting
            ? "Saving..."
            : editingId
              ? "Save changes"
              : "Create category"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isUploading}
          className="px-4 py-2.5 border border-gray-300 rounded hover:bg-gray-50 bg-gray-300 text-gray-700 hover:text-gray-500 flex items-center gap-1 cursor-pointer duration-300"
        >
          <XCircle className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </>
  );
};

export default SubmitSection;
