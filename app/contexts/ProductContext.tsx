'use client';

import { createContext, useContext, useState } from "react";


interface ProductContextType{
    title: string | null;
    setTitle: (title: string)=>void;
}

const ProductContext = createContext<ProductContextType>({
    title: null,
    setTitle: ()=>{}
})

export function ProductProvider({children}:{children: React.ReactNode}){
    const [title, setTitle] = useState<string | null>(null);
    return (
        <ProductContext.Provider value={{title, setTitle}}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct(){
    return useContext(ProductContext);
}