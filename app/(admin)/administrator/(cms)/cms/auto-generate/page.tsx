"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ArticleForm from "./_components/ArticleForm";
import { useCategoryStore } from "@/store/categoryStore";
import { useAuthStore } from "@/store/authStore";
import { useArticles } from "../articles/hooks/useArticles";
import ProcessInfo from "./_components/ProcessInfo";
import { ARTICLE_GENERATION_PROMPT } from "./utils/textPrompt";
import { cleanGeneratedHTML } from "./utils/cleanGeneratedHTML";
import { transliterate } from "@/utils/transliterate";
import { ArticleFormData } from "../articles/types";
import { ArticleData } from "./types/auto-generate.types";
import { generateArticlesImages, updateArticleWithImages } from "./utils/imageGeneration";
import GenerationStatusPanel from "./_components/GenerationStatusPanel";

const AutoGeneratePage = ({}) => {
  const { createArticle } = useArticles();
  const { categories, loadCategories } = useCategoryStore();
  const { user } = useAuthStore();
  const author = `${user?.name} ${user?.surname}`.trim() || "Unknown";

  const [topic, setTopic] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [isCategotyOpen, setIsCategoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [generationStatus, setGenerationStatus] = useState<
    "idle" | "generating" | "loading" | "success" | "error"
  >("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>("1");
  const [currentStepName, setCurrentStepName] = useState<string>("Main image");
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(()=>{
    if(timeRef.current){
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
    if(generationStatus === 'generating' || generationStatus === 'loading'){
      timeRef.current = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
      },1000)
    }else if(generationStatus === 'idle' || generationStatus=== 'success'){
      setElapsedSeconds(0);
    }

    return ()=>{
      if(timeRef.current){
        clearInterval(timeRef.current);
      }
    }
  },[generationStatus])

  useEffect(() => {
    loadCategories({ unlimited: true });
  }, [loadCategories]);

  const selectedCategory = categories.find((c) => c._id === categoryId);

  const handleCategorySelect = (categotyId: string) => {
    const selected = categories.find((c) => c._id === categotyId);
    if (selected) {
      setCategoryId(selected._id);
      setCategoryName(selected.name);
      setCategorySlug(selected.slug);
      setIsCategoryOpen(false);
    }
  };

  const generateImagesInBackground = useCallback(
    async (articleId: string, topic: string, articleData: ArticleData) => {
    try {
      setGenerationStatus('generating');
      setCurrentStep('1');
      setCurrentStepName('Main image');

      const images = await generateArticlesImages(
        topic,
        articleData,
        (step: number, stepName: string) => {
          setGenerationStatus('loading')
          setCurrentStep(step.toString());
          setCurrentStepName(stepName);
        }
      )

      setGenerationStatus('success');
      setCurrentStep('3');
      setCurrentStepName('Done');

      const updated = await updateArticleWithImages(
        articleId,
        articleData,
        images,
        topic
      )

      if(updated){
        setTimeout(() => {
          window.location.href = `/blog/${articleData.categorySlug}/${articleData.slug}`
        },2000)
      }else{
        console.warn("Article created, but failed to update with images")
        setTimeout(() => {
        window.location.href = `/blog/${articleData.categorySlug}/${articleData.slug}`
      },2000)
      }
    } catch (error) {
      console.error("Error generating images", error);
      setGenerationStatus('error');
      setCurrentStepName('Error');

      setTimeout(() => {
        window.location.href = `/blog/${articleData.categorySlug}/${articleData.slug}`
      },2000)
    }
  },[])

  const handleGenerateAndSave = async () => {
    if (!topic.trim()) {
      setError("Enter article's topic");
    }
    if (!categoryId) {
      setError("Select category");
    }
    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    setGenerationStatus("generating");
    setElapsedSeconds(0);

    try {
      const prompt = ARTICLE_GENERATION_PROMPT(topic);
      const response = await fetch(
        "/administrator/cms/api/articles/yandex-gpt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            action: "generate",
          }),
        },
      );
      const data = await response.json();

      console.log(data)
     
      if(!response.ok || !data.success){
        throw new Error(data.error || data.details || "Failed to generate text");
      }

      const content = cleanGeneratedHTML(data.text);
      const slug = transliterate(topic, true);
      console.log(content, slug)

      const stripHtmlTags = (html: string): string => {
        return html.replace(/<[^>]*>/g, "");
      }

      const plainText = stripHtmlTags(content);
      const description = plainText.substring(0, 160).trim();

      const articleData:ArticleFormData = {
        name: topic,
        slug: slug,
        description,
        keywords: [],
        image: '',
        imageAlt: topic,
        author: author,
        categoryId: categoryId,
        categoryName: categoryName,
        categorySlug: categorySlug,
        content,
        isFeatured: false,
        status: 'published'
      }

      const result = await createArticle(articleData);

      if(!result.success || !result.data?._id){
        throw new Error(result.message || "Failed to save article");
      }
      setSuccess(`Article "${topic}" was successfully created! Generating image...`);

      const articleId = result.data._id;

      const fullArticleData: ArticleData = {
        ...articleData,
        _id: articleId,
        content,
        categoryId,
        categoryName,
        categorySlug
      }

      setTimeout(() => {
        generateImagesInBackground(articleId, topic,fullArticleData);
      }, 1000);
    } catch (error) {
      console.error("Error generating or saving article", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setIsGenerating(false);
      setGenerationStatus("error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Automatic generation
        </h1>
        <p className="text-gray-600 mt-2">
          Generation and automatic saving atricles with images
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        {generationStatus !== 'idle' ? (
          <GenerationStatusPanel
            status={generationStatus}
            elapsedSeconds={elapsedSeconds}
            currentStep={currentStep}
            totalSteps={'3'}
            currentStepName={currentStepName}
          />
        ):(
          <ArticleForm
          topic={topic}
          selectedCategoryId={categoryId}
          selectedCategorySlug={selectedCategory?.slug}
          categorySlug={categorySlug}
          isCategoryOpen={isCategotyOpen}
          isGenerating={isGenerating}
          error={error}
          success={success}
          onTopicChange={setTopic}
          onCategorySelect={handleCategorySelect}
          onToggleCategoryOpen={() => setIsCategoryOpen(!isCategotyOpen)}
          onGenerate={handleGenerateAndSave}
        />
        )}
        
        <ProcessInfo />
      </div>
    </div>
  );
};

export default AutoGeneratePage;
