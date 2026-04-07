'use client'
import { initialRegFormData } from "@/constants/regFormData"
import { RegFormData } from "@/types/regFormData"
import React, { createContext,ReactNode, useContext, useState } from "react"

type RegFormContextType = {
    regFormData: RegFormData;
    setRegFormData: React.Dispatch<React.SetStateAction<RegFormData>>;
    resetRegFormData: ()=>void;
}

const RegFormContext = createContext<RegFormContextType>({
    regFormData: initialRegFormData,
    setRegFormData: () => {},
    resetRegFormData: ()=>{},
});

export const RegFormProvider = ({children}:{children: ReactNode})=>{
    const [regFormData, setRegFormData] = useState<RegFormData>(initialRegFormData);
    const resetRegFormData = () => {
    setRegFormData(initialRegFormData);
  };

  return (
    <RegFormContext.Provider value={{regFormData,setRegFormData, resetRegFormData}}>
        {children}
    </RegFormContext.Provider>
  );
}
  export const useRegFormContext = ()=> useContext(RegFormContext);