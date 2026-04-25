import { useArticleStore } from "@/store/articleStore"
import { Eye, EyeOff, FileText, Globe, Save, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitSectionProps } from "../../../categories/types";
import ArticlePreviewModal from "./tiptap-components/ArticlePreviewModal";
import './css/modal-preview.css'


const ArticleSubmitSection = ({onCancel}:SubmitSectionProps) => {
const {updateFormField, isSubmitting, isUploading, formData} = useArticleStore();

const [articleStatus, setArticleStatus] = useState<'draft' | 'published'>(
    formData.status === 'published' || formData.status === 'draft'
    ? formData.status
    : 'draft'
);

const [isFeatured, setIsFeatured] = useState<boolean>(formData.isFeatured || false);
const [showPreview, setShowPreview] = useState<boolean>(false);

useEffect(()=>{
    if(formData.status){
        const safeStatus = formData.status === 'published' ? 'published' : 'draft';
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setArticleStatus(safeStatus);
    }
    if(formData.isFeatured !== undefined){
        setIsFeatured(formData.isFeatured);
    }
    
},[formData.isFeatured, formData.status]);

const handleStatusChange =(status: 'draft' | 'published')=>{
    setArticleStatus(status);
    updateFormField('status', status);
}

const handleFeaturedChange = (featured: boolean)=>{
    setIsFeatured(featured);
    updateFormField('isFeatured', featured);
}

const handleCancelWithConfirm = ()=>{
    const hasData = 
    formData.name.trim() !== '' ||
    formData.slug.trim() !== '' ||
    formData.description.trim() !== '' ||
    formData.image.trim() !== '' ||
    formData.keywords.trim() !== '' ||
    formData.content?.trim() !== '';

    if(hasData){
        const confirmCancel = confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');
        if(confirmCancel){
            onCancel()
        }
    }else{
        onCancel();
    }
};

const canPreview = formData.content?.trim() !== '';

  return (
    <>
    <ArticlePreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />

    <div className="mb-6 bg-linear-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              Article preview
            </h3>
            <p className="text-gray-600 text-sm">
              Pay attention to the article preview before publishing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={!canPreview || isUploading || isSubmitting}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap shadow-lg ${
              canPreview
                ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all"
                : "bg-gray-200 text-gray-500"
            }`}
            title={
              !canPreview
                ? "Add content to preview"
                : "Open article preview"
            }
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>

        {!canPreview && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 text-sm">
              Article name and content are required for preview.
            </p>
          </div>
        )}
      </div>

    <div className="my-6 bg-gray-50 p-4 rounded border border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 "/>
            Feature status
        </h3>
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                type='button'
                onClick={()=>handleFeaturedChange(false)}
                disabled={isSubmitting || isUploading}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    !isFeatured
                    ? 'bg-white text-gray-700 border-gray-300 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }` }
                >
                    <FileText className="w-5 h-5"/>     
                    <div className="text-left">
                        <div className="font-medium">
                            Simple article
                        </div>
                        <div className="text-sm text-gray-500">
                            Standart display
                        </div>
                    </div>
                </button>

                <button
                type="button"
                onClick={()=>handleFeaturedChange(true)}
                disabled={isSubmitting || isUploading}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    !isFeatured
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }` }
                >
                    <Star className="w-5 h-5"/>
                    <div className="text-left">
                        <div className="font-medium">Featured article</div>
                        <div className="text-sm text-gray-500">
                            Highlight in a special way
                        </div>
                    </div>
                </button>
            </div>

            <div className="text-sm text-gray-600 p-3 bg-white rounded border border-gray-200">
                {isFeatured ? (
                    <div>
                        <p className="font-medium mb-2">Featured article will be:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Shown on blogs main page</li>
                            <li>Higleted in block &quot;Reccomend&quot;</li>
                            <li>Marked with a star icon in lists</li>
                            <li>Showed upwords in articles list</li>
                        </ul>
                    </div>
                ):(
                    <div>
                        <p className="font-medium mb-2">Simple article will be:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Show in common articles list</li>
                            <li>Sort by publish date</li>
                            <li>Will work in categories and search</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>

     <div className="my-6 bg-gray-50 p-4 rounded border border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Publish status
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleStatusChange("draft")}
              disabled={isUploading || isSubmitting}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                articleStatus === "draft"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-300 shadow-sm"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <EyeOff className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Draft</div>
                <div className="text-sm text-gray-500">
                  Save, but don&apos;t publish
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("published")}
              disabled={isUploading || isSubmitting}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                articleStatus === "published"
                  ? "bg-green-50 text-green-700 border-green-300 shadow-sm"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Eye className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Publish</div>
                <div className="text-sm text-gray-500">
                  Publish immediately on website
                </div>
              </div>
            </button>
          </div>

          <div className="text-sm text-gray-600 p-3 bg-white rounded border border-gray-200">
            {articleStatus === "draft" ? (
              <div>
                <p className="font-medium mb-2">
                  Article will be saved as draft:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Will be display only in admin panel</li>
                  <li>You will be able to edit it</li>
                  <li>Will not be visible on website</li>
                </ul>
              </div>
            ) : (
              <div>
                <p className="font-medium mb-2">
                  Articl will be published:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Will be visible on website</li>
                  <li>Will be display in articles list</li>
                  <li>Will be display in search results</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="submit"
          disabled={isUploading || isSubmitting}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex-1 ${
            articleStatus === "published"
              ? isFeatured
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-green-600 text-white hover:bg-green-700"
              : "bg-yellow-600 text-white hover:bg-yellow-700"
          }`}
        >
          <Save className="w-5 h-5" />
          <span>
            {isSubmitting
              ? "Saving..."
              : articleStatus === "published"
                ? isFeatured
                  ? "Save as featured article"
                  : "Publish article"
                : isFeatured
                  ? "Save as a featured draft"
                  : "Save as draft"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleCancelWithConfirm}
          disabled={isUploading || isSubmitting}
          className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export default ArticleSubmitSection