import { CONFIG_BLOG } from "@/app/(admin)/administrator/(cms)/cms/CONFIG_BLOG";
import { Category, CategoryFormData, FilterType, SortDirection, SortField } from "@/app/(admin)/administrator/(cms)/cms/types";
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
    isReordering: boolean;
    showForm:boolean;
    originalImageUrl:string;
    formData: CategoryFormData;
    currentPage: number; 
    itemsPerPage: number;
    sortField: SortField;
    sortDirection: SortDirection;
    searchQuery: string;
    filterType: FilterType;

    draggedId: string | null; 
    dragOverId: string | null;
    tempOrder: Map<string, number>;


    setCategories: (categories:Category[]) => void;
    setTotalItems: (totalItems: number) => void;
    setTotalPages: (totalPages: number) => void;
    setTotalAllItems: (totalAllItems: number) => void;
    setEditingId: (editingId: string | null) => void;
    clearEdidtingId: () => void;
    setLoading: (loading: boolean) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    setIsUploading: (isUploading: boolean) => void;
    setIsReordering: (Reordering: boolean) => void;
    setShowForm: (showForm: boolean) => void;
    setOriginalImageUrl: (originalImageUrl: string) => void;
    setFormData: (formData: CategoryFormData) => void;
    updateFormField: (field: keyof CategoryFormData, value: string) => void;
    resetFormData: () => void;
    setCurrentPage: (currentPage: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    setSortField: (sortField: SortField) => void;
    setSortDirection: (sortDirection: SortDirection) => void;
    loadCategoties: (params?:{page?:number ,search?:string , filterBy?:FilterType}) => Promise<void>;
    setSearchQuery: (searchQuery: string) => void;
    setFilterType: (filterType: FilterType) => void;
    handleSearchChange: (value: string)=>void;
    handleSearchClear: ()=>void;

    setDraggedId: (draggedId: string | null) => void;
    setDragOverId: (dragOverId: string | null) => void;
    setTempOrder: (tempOrder: Map<string, number>) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    totalItems: 0,
    totalPages: 0,
    totalAllItems: 0,
    editingId: null,
    loading: false,
    isSubmitting: false,
    isUploading: false,
    isReordering: false,
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
    sortField: 'numericId' as SortField,
    sortDirection: 'asc' as SortDirection,
    searchQuery: '',
    filterType: 'all' as FilterType,
    draggedId: null,
    dragOverId: null,
    tempOrder:new Map(),
    
   
    

    setCategories: (categories) => set({categories}),
    setTotalItems: (totalItems) => set({totalItems}),
    setTotalPages: (totalPages) => set({totalPages}),
    setTotalAllItems: (totalAllItems) => set({totalAllItems}),
    setEditingId: (editingId) => set({editingId}),
    clearEdidtingId: () => set({editingId: null}),
    setLoading: (loading) => set({loading}),
    setIsSubmitting: (isSubmitting) => set({isSubmitting}),
    setIsUploading: (isUploading) => set({isUploading}),
    setIsReordering: (isReordering) => set({isReordering}),
    setShowForm: (showForm) => set({showForm}),
    setOriginalImageUrl: (originalImageUrl) => set({originalImageUrl}),
    setFormData: (formData) => set({formData}),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
    updateFormField: (field, value) => set((state) => ({ formData: { ...state.formData, [field]: value } })),
     resetFormData: () => set({ formData: { name: '', image: '', slug: '', description: '', imageAlt: '', keywords: '' } }),
     setSortField: (sortField) => set({ sortField }),
     setSortDirection: (sortDirection) => set({ sortDirection }),
     setSearchQuery: (searchQuery) => set({ searchQuery }), 
     setFilterType: (filterType) => set({ filterType }),
     handleSearchChange: (value: string) => set({ searchQuery: value }),
     handleSearchClear: () => set({ searchQuery: '' }),

     setDraggedId: (draggedId) => set({ draggedId }),
     setDragOverId: (dragOverId) => set({ dragOverId }),
     setTempOrder: (tempOrder) => set({ tempOrder }),
loadCategoties:  async (params?:{page?:number; search?:string; filterBy?:FilterType}) => {
        const state = get();
         set({ loading: true });
         try {
           const queryParams = new URLSearchParams()
           const pageToLoad = params?.page ??  state.currentPage;
           const search = params?.search ?? state.searchQuery;
           const filterBy = params?.filterBy ?? state.filterType;
           queryParams.append('pageToLoad', pageToLoad.toString());
           queryParams.append('limit', state.itemsPerPage.toString());
           queryParams.append('sortBy', state.sortField.toString());
           queryParams.append('sortOrder', state.sortDirection.toString());
           queryParams.append('search', search.toString());
           queryParams.append('filterBy', filterBy.toString());
     
           const response = await fetch(`/administrator/cms/api/categories?${queryParams}`);
           const data = await response.json();
     
           if (data.success) {
            set({
              categories: data.data.categories,
              totalAllItems: data.data.totalInDb,
              totalItems: data.data.pagination.total,
              totalPages: data.data.pagination.totalPages,
              currentPage: params?.page ?? state.currentPage,
              searchQuery: params?.search ?? state.searchQuery,
              filterType: params?.filterBy ?? state.filterType
            }); 
           }
         } catch (error) {
           console.error("Error loading categories", error);
         } finally {
           set({ loading: false });
         }
       }
     
}))