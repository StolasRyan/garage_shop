import { Loader } from "lucide-react";
import { FormData, SiteSettings } from "../../types/siteSettings";
import FormField from "./FormField";
import CurrentSettings from "./CurrentSettings";
import FormButtons from "./FormButtons";

interface SEOFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  settings: SiteSettings | null;
  saving: boolean;
  handleSave: (e: React.FormEvent) => void;
  reloading?: boolean;
}

const SEOForm = ({
  formData,
  setFormData,
  settings,
  saving,
  handleSave,
  reloading = false,
}: SEOFormProps) => {
  return (
    <form onSubmit={handleSave}
    className="bg-white rounded-lg shadow-sm p-6 relative"
    >
      {reloading && settings && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      )}
      <div className="space-y-6">
        <FormField
        label="Site title"
        value={formData.siteTitle}
        onChange={(value)=>setFormData({...formData, siteTitle:value})}
        type="text"
        placeholder="Your's site name"
        hint="For site title in browser and search systems (50-60 characters recommended)"
        disabled={reloading}
        />
        <FormField
        label="Meta-description"
        value={formData.metaDescription}
        onChange={(value)=>setFormData({...formData, metaDescription:value})}
        type="textarea"
        rows={3}
        placeholder="Short site description for search engines"
        hint="Optimal length 150-160 characters"
        disabled={reloading}
        />
        <FormField
        label="Keywords of site"
        value={formData.siteKeywords}
        onChange={(value)=>setFormData({...formData, siteKeywords:value})}
        type='textarea'
        rows={3}
        placeholder="Keyword 1, Keyword 2, Keyword 3"
        hint="Most common keywords for your site"
        disabled={reloading}
        showCommaHint
        />
        <FormField
        label="Semantic core"
        value={formData.semanticCore}
        onChange={(value)=>setFormData({...formData, semanticCore:value})}
        type='textarea'
        rows={4}
        placeholder="Theme 1, Theme 2, Theme 3"
        hint="Semantic core of your site. Using for SEO optimization "
        disabled={reloading}
        showCommaHint
        />
        {settings && (
          <div className="relative">
            <CurrentSettings settings={settings} />
            {reloading && (
              <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 text-gray-500" />
              </div>
            )}
          </div>
        )}
        <FormButtons saving={saving} disabled={reloading} />
      </div>
    </form>
  )
};

export default SEOForm;
