import { RotateCcw } from "lucide-react";
import { SEO_LIMITS } from "../../utils/SEO_LIMITS";
import { useCategoryStore } from "@/store/categoryStore";
import { FormFieldsProps } from "../../types";

const FormFields = ({ charCount,errors, onInputChange,onGenerateSlug}:FormFieldsProps) => {
    const {formData,isSubmitting} = useCategoryStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Category Name *
          </label>
          <span
          className={`text-xs ${
            charCount.name > SEO_LIMITS.name.max
              ? "text-red-600"
              : "text-gray-500"
          }`}
          >{charCount.name}/{SEO_LIMITS.name.max}
          </span>
        </div>
        <input 
        type="text" 
        required 
        placeholder="Ex.: Jusies" 
        value={formData.name}
        disabled={isSubmitting}
        onChange={(e)=>onInputChange('name', e.target.value, SEO_LIMITS.name.max)}
        className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-3 duration-300 ${
            errors.name
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-primary focus:ring-primary/50'
        } disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-400`}
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <span
          className={`text-xs ${
            charCount.slug > SEO_LIMITS.slug.max
              ? "text-red-600"
              : "text-gray-500"
          }`}
          >{charCount.slug}/{SEO_LIMITS.slug.max}
          </span>
        </div>
        <div className="flex gap-2">
            <input 
            type="text" 
            required 
            placeholder="jusies"
            value={formData.slug}
            disabled={isSubmitting} 
        onChange={(e)=>{
            const value = e.target.value.toLocaleLowerCase();
            const cleaned = value.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            onInputChange('slug', cleaned, SEO_LIMITS.slug.max)}}
            className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-3 duration-300 ${
            errors.slug
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-primary focus:ring-primary/50'
        } disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-400`}
            />
            {errors.slug && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
            <button 
            type="button" 
            onClick={onGenerateSlug}
            disabled={isSubmitting}
            className="flex items-center gap-1 px-4 py-2.5 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 text-sm whitespace-nowrap cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
                <RotateCcw className="w-4 h-4"/>
                Generate
            </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Description (meta-description)</label>
            <span
          className={`text-xs ${
            charCount.description > SEO_LIMITS.description.max
              ? "text-red-600"
              : "text-gray-500"
          }`}
          >{charCount.description}/{SEO_LIMITS.description.max}
          </span>
        </div>
        <textarea 
        rows={3}
         placeholder="Short description of category for search systems (10-160 characters)"
         value={formData.description}
         disabled={isSubmitting}
        onChange={(e)=>onInputChange('description', e.target.value, SEO_LIMITS.description.max)}
        className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-3 duration-300 ${
            errors.description
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-primary focus:ring-primary/50'
        } disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-400`}
         />
         {errors.description && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

        <div className="md:col-span-2">
             <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
                Keywords <span className="text-gray-500 text-xs ml-2">(separated by commas)</span>
            </label>
             <span
          className={`text-xs ${
            charCount.keywords > SEO_LIMITS.keywords.maxLength
              ? "text-red-600"
              : "text-gray-500"
          }`}
          >{charCount.keywords}/{SEO_LIMITS.keywords.maxLength}
          </span>
        </div>
        <input 
        type="text" 
        placeholder="meat, frozen, drinks"
        value={formData.keywords}
        disabled={isSubmitting}
        onChange={(e)=>onInputChange('keywords', e.target.value, SEO_LIMITS.keywords.maxLength)}
        className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-3 duration-300 ${
            errors.keywords
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-primary focus:ring-primary/50'
        } disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-400`}
        />
        {errors.keywords && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
        </div>
    </div>
  );
};

export default FormFields;
