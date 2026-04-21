import { AlertCircle, Upload, XCircle } from "lucide-react";
import { useRef } from "react";
import { SEO_LIMITS } from "../../utils/SEO_LIMITS";
import Image from "next/image";
import { useCategoryStore } from "@/store/categoryStore";
import { ImageSectionProps } from "../../types";

const ImageSection = ({
  errors,
  charCount,
  onInputChange,
  onFileChange,
  onRemoveImage,
}:ImageSectionProps) => {
    const {formData,editingId, isSubmitting, isUploading} = useCategoryStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    onRemoveImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Category image</h3>
      <div className="space-y-4">
        {formData.image && (
          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0 bg-gray-100">
                <Image
                  src={formData.image}
                  alt="Preview"
                  width={800}
                  height={450}
                  className="w-200 h-112.5 p-2 object-cover rounded shadow-sm"
                  unoptimized={formData.image.startsWith("blob:")}
                />
              </div>
            </div>
            <div className="flex-1 mt-8">
              <p className="text-sm text-gray-600 mb-2">
                {formData.image.startsWith("blob:")
                  ? "New image (will be uploaded after saving)"
                  : "Current image of category"}
              </p>
              {formData.image.startsWith("blob:") && (
                <p className="flex items-center gap-1 text-xs text-green-600 mb-2">
                  <AlertCircle className="w-3 h-3" />
                  Old image will be replaced after saving
                </p>
              )}
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isUploading || isSubmitting}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 border text-red-600 rounded hover:bg-red-100 cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-red-200 hover:border-red-300"
              >
                <XCircle className="w-4 h-4" />
                Remove image
              </button>
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">
            {formData.image ? "Replace image" : "Upload an image"}
            <span className="text-gray-500 text-xs ml-2">
              (reccomend 800x450px, max. 5MB)
            </span>
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png, image/webp, image/jpg, image/gif"
                  className="hidden"
                  disabled={isUploading || isSubmitting}
                  onChange={onFileChange}
                />
                <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 duration-300 disabled:opacity-50 disabled:bg-gray-100 bg-white hover:bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Upload className="w-4 h-4" />
                    <span>Choose file</span>
                  </div>
                </div>
              </label>
            </div>
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                Processing...
              </div>
            )}
          </div>
          {formData.image && (
            <div>
              <div className="flex justify-between items-center mb-1 mt-2">
                <label className="block text-sm font-medium">
                  Image description (Alt text)
                </label>
                <span
                  className={`text-xs ${
                    charCount.imageAlt > SEO_LIMITS.imageAlt.max
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {charCount.imageAlt}/{SEO_LIMITS.imageAlt.max}
                </span>
              </div>
              <input
                type="text"
                value={formData.imageAlt || ""}
                onChange={(e) =>
                  onInputChange(
                    "imageAlt",
                    e.target.value,
                    SEO_LIMITS.imageAlt.max,
                  )
                }
                disabled={isSubmitting}
                className={`w-full px-3 py-2.5 bg-white border rounded focus:outline-none focus:ring-3 duration-300 ${
                  errors.imageAlt
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-primary focus:ring-primary/50"
                } disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-400`}
              />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Allowed formats: .jpg, .jpeg, .png, .webp, .gif. Image will be
            uploaded only after saving the category.
            {editingId && formData.image && formData.image.startsWith("blob:") && (
                <span className="flex items-center gap-2 text-base text-red-600 mt-1">
                    <AlertCircle className="w-5 h-5" />
                    Old image will be replaced after saving
                </span>
            )}
          </p>
        </div>
        {}
      </div>
    </div>
  );
};

export default ImageSection;
