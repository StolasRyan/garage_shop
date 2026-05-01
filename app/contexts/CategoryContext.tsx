'use client'
import { createContext, useContext, useState } from "react";


interface CategoryContextType {
        categoryTitle: string | null;
        setCategoryTitle: (title: string) => void;
    }
    
 export const CategoryContext = createContext<CategoryContextType>({
        categoryTitle: '',
        setCategoryTitle: () => {},
});

export function CategoryProvider({children}:{children: React.ReactNode}){
    const [categoryTitle, setCategoryTitle] = useState<string>('');
    return (
        <CategoryContext.Provider value={{categoryTitle, setCategoryTitle}}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategoryTitles(){
    return useContext(CategoryContext);
}