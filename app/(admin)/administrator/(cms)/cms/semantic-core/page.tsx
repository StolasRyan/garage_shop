'use client'
import { Loader, Loader2 } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import Header from "../_components/Header";
import SEOForm from "./_components/SEOForm";
import SEOReccomendations from "../_components/SEOReccomendations";
import { commonSEOReccomendations } from "../utils/reccomendations";

const SemanticCorePage = () => {
  const {
    siteSettings,
    loading,
    saving,
    formData,
    setFormData,
    handleSave,
  } = useSiteSettings();

  if(loading){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <Loader className="animate-spin h-8 w-8 text-primary"/>
        </div>
    )
  }

  return (
    <>
        {saving && (
            <div className="fixed top-4 right-4 z-50">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
                    <Loader2 className="animate-spin h-4 w-4 text-primary"/>
                    <span className="text-sm text-primary">Saving...</span>
                </div>
            </div>
        )}
        <Header title="SEO site settings" description="Key words and semantic core options"/>
        <SEOForm
            formData={formData}
            setFormData={setFormData}
            settings={siteSettings}
            saving={saving}
            handleSave={handleSave}
        />
        <SEOReccomendations reccomendations={commonSEOReccomendations}/>
    </>
  );
};

export default SemanticCorePage;
