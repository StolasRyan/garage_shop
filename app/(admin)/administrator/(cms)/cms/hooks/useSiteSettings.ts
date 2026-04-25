import { useEffect, useState } from "react";
import { SiteSettings, FormData } from "../types/siteSettings";

export const useSiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    siteTitle: "",
    metaDescription: "",
    siteKeywords: "",
    semanticCore: "",
  });

  const loadSettings = async () => {
    setLoading(true);

    try {
      const response = await fetch("/administrator/cms/api/site-settings");
      const data = await response.json();

      if (data.success) {
        setSiteSettings(data.data);
        setFormData({
          siteTitle: data.data.siteTitle || "",
          metaDescription: data.data.metaDescription || "",
          siteKeywords: (data.data.siteKeywords || []).join(", "),
          semanticCore: (data.data.semanticCore || []).join(", "),
        });
      }
    } catch (error) {
      console.error("Error loading site settings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/administrator/cms/api/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteTitle: formData.siteTitle,
          metaDescription: formData.metaDescription,
          siteKeywords: formData.siteKeywords.split(", ").map((keyword) => keyword.trim()).filter((keyword) => keyword.length > 0),
          semanticCore: formData.semanticCore.split(", ").map((keyword) => keyword.trim()).filter((keyword) => keyword.length > 0),
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Site settings saved successfully");
        await loadSettings();
      }else{
          alert("Failed to save site settings");
      }
    } catch (error) {
      console.error("Error saving site settings", error);
      alert("Failed to save site settings");
    } finally {
      setSaving(false);
    }
  };

  return {
    siteSettings,
    loading,
    saving,
    formData,
    setFormData,
    handleSave,
    loadSettings
  };
};
