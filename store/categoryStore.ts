import { CONFIG_BLOG } from "@/app/(admin)/administrator/(cms)/cms/CONFIG_BLOG";
import { Category, CategoryFormData } from "@/app/(admin)/administrator/(cms)/cms/types";
import { create } from "zustand";


interface CategoryStore{
    categories:Category[];
    totalItems: number;
    totalPages: number;
    totalAllItems: number;
    editingId: string | null;
    loading: boolean;
    isSubmitting: boolean;
    isUploading: boolean;
    showForm:boolean;
    originalImageUrl:string;
    formData: CategoryFormData;
    currentPage: number; 
    itemsPerPage: number;

    setCategories: (categories:Category[]) => void;
    setTotalItems: (totalItems: number) => void;
    setTotalPages: (totalPages: number) => void;
    setTotalAllItems: (totalAllItems: number) => void;
    setEditingId: (editingId: string | null) => void;
    clearEdidtingId: () => void;
    setLoading: (loading: boolean) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    setIsUploading: (isUploading: boolean) => void;
    setShowForm: (showForm: boolean) => void;
    setOriginalImageUrl: (originalImageUrl: string) => void;
    setFormData: (formData: CategoryFormData) => void;
    updateFormField: (field: keyof CategoryFormData, value: string) => void;
    resetFormData: () => void;
    setCurrentPage: (currentPage: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    totalItems: 0,
    totalPages: 0,
    totalAllItems: 0,
    editingId: null,
    loading: false,
    isSubmitting: false,
    isUploading: false,
    showForm:false,
    originalImageUrl: '',
    currentPage: 1,
    itemsPerPage:CONFIG_BLOG.ITEMS_PER_PAGE,
    formData: {
        name: '',
        image: '',
        slug: '',
        description: '',
        imageAlt: '',
        keywords: ''
    },
    
    
    
   
    

    setCategories: (categories) => set({categories}),
    setTotalItems: (totalItems) => set({totalItems}),
    setTotalPages: (totalPages) => set({totalPages}),
    setTotalAllItems: (totalAllItems) => set({totalAllItems}),
    setEditingId: (editingId) => set({editingId}),
    clearEdidtingId: () => set({editingId: null}),
    setLoading: (loading) => set({loading}),
    setIsSubmitting: (isSubmitting) => set({isSubmitting}),
    setIsUploading: (isUploading) => set({isUploading}),
    setShowForm: (showForm) => set({showForm}),
    setOriginalImageUrl: (originalImageUrl) => set({originalImageUrl}),
    setFormData: (formData) => set({formData}),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
    updateFormField: (field, value) => set((state) => ({ formData: { ...state.formData, [field]: value } })),
     resetFormData: () => set({ formData: { name: '', image: '', slug: '', description: '', imageAlt: '', keywords: '' } }),
     
}))