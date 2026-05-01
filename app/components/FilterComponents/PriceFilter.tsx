"use client";

import ErrorComponent from "@/app/components/ErrorComponent";
import MiniLoader from "@/app/components/Header/MiniLoader";
import { CONFIG } from "@/config/config";
import { PriceFilterProps, PriceRange } from "@/types/priceTypes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PriceFilterHeader from "./PriceFilterHeader";
import PriceInputs from "./PriceInputs";
import PriceRangeSlider from "./PriceRangeSlider";
import InStockToogle from "../Header/InStockToogle";

const PriceFilter = ({ basePath, category, setIsFilterOpenAction,userId,apiEndpoint = 'category' }: PriceFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPriceFrom = searchParams.get("priceFrom") || "";
  const urlPriceTo = searchParams.get("priceTo") || "";
  const urlInStock = searchParams.get("inStock") === "true";
  
console.log(apiEndpoint);

  const [inputValues, setInputValues] = useState({
    from: urlPriceFrom,
    to: urlPriceTo,
  });
  const [priceRange, setPriceRange] = useState<PriceRange>(
    CONFIG.FALLBACK_PRICE_RANGE,
  );
  const [inStock, setInStock] = useState<boolean>(urlInStock);
  const [error, setError] = useState<{error: Error; userMessage: string} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPriceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      
      const currentCategory = category || searchParams.get("category");
      if(!currentCategory) return;

      const params = new URLSearchParams();
      params.set('category', currentCategory);
      params.set('getPriceRangeOnly', 'true');

      if(userId){
        params.set('userId', userId);
      }

      const response = await fetch(`/api/${apiEndpoint}?${params.toString()}`);

      if(!response.ok) throw new Error(`Failed to fetch price data: ${response.status}`);

      const data = await response.json();
      const recievedRange = data.priceRange || CONFIG.FALLBACK_PRICE_RANGE;

      const roundedRange = {
        min: Math.floor(Number(recievedRange.min)) || CONFIG.FALLBACK_PRICE_RANGE.min,
        max: Math.ceil(Number(recievedRange.max)) || CONFIG.FALLBACK_PRICE_RANGE.max
      }

      setPriceRange(roundedRange);
      setInputValues({
        from: urlPriceFrom || (roundedRange.min || CONFIG.FALLBACK_PRICE_RANGE.min).toString(),
        to: urlPriceTo || (roundedRange.max || CONFIG.FALLBACK_PRICE_RANGE.max).toString(),
      })
    }
    catch(e){
      setError({
        error: e instanceof Error ? e : new Error(String(e)),
        userMessage: "Failed to fetch products by price",
      });
      setPriceRange(CONFIG.FALLBACK_PRICE_RANGE);
      setInputValues({
        from: CONFIG.FALLBACK_PRICE_RANGE.min.toString(),
        to: CONFIG.FALLBACK_PRICE_RANGE.max.toString(),
      })
    }
    finally{
      setIsLoading(false);
    }
  },[apiEndpoint, category, searchParams, urlPriceFrom, urlPriceTo, userId]);

  useEffect(()=>{
    fetchPriceData();
  },[fetchPriceData])

  // const handleInputChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setInputValues((prevValues) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   },
  //   [],
  // );

  const handleSubmit =(e: React.FormEvent)=>{
    e.preventDefault();
    applyPriceFiler();
    if(setIsFilterOpenAction) setIsFilterOpenAction(false);
  }

  const applyPriceFiler = useCallback(() =>{
    const params = new URLSearchParams(searchParams.toString());
   

    let fromValue = Math.max(
      priceRange.min,
      parseInt(inputValues.from) || priceRange.min
    )
    let toValue = Math.min(
      priceRange.max,
      parseInt(inputValues.to) || priceRange.max
    )

    if(fromValue > toValue) [fromValue, toValue] = [toValue, fromValue];

    params.delete("page");

    params.set("priceFrom", String(fromValue));
    params.set("priceTo", String(toValue));
    params.set('inStock', String(inStock));

    router.push(`${basePath}?${params.toString()}`);

  },[basePath, inputValues.from, inputValues.to, priceRange.max, priceRange.min, router, searchParams, inStock]);

  const sliderValues = [
    parseInt(inputValues.from) || priceRange.min,
    parseInt(inputValues.to) || priceRange.max
  ];

  const handleSliderChange = useCallback((values: [number , number]) => {
    
      setInputValues({
        from: String(values[0]),
        to: String(values[1])
      })
    
  },[])

  const resetPriceFilter = useCallback(() => {
    setInputValues({
      from: String(priceRange.min),
      to: String(priceRange.max),
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceFrom");
    params.delete("priceTo");
    params.delete("page");

    router.push(`${basePath}?${params.toString()}`);
  },[basePath, priceRange.max, priceRange.min, router, searchParams]);

   if (isLoading || isNaN(priceRange.min) || isNaN(priceRange.max)) {
    return <MiniLoader/>;
  }

  if (error) {
    return <ErrorComponent error={error.error} userMessage={error.userMessage}/>
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-y-10 text-gray-700"
    >
      <PriceFilterHeader onResetAction={resetPriceFilter}/>
      <PriceInputs 
      from={inputValues.from} 
      to={inputValues.to}
      min={priceRange.min}
      max={priceRange.max}
      onFromChangeAction={
        (value:string)=>setInputValues((prev)=>({...prev, from: value}))}
      onToChangeAction={
        (value:string)=>setInputValues((prev)=>({...prev, to: value}))}
      />
     <PriceRangeSlider
     min={priceRange.min}
      max={priceRange.max}
      values={sliderValues}
      onChangeAction={handleSliderChange}
     />
      <InStockToogle checked={inStock} onChangeAction={(checked)=>setInStock(checked)}  labelText="In stock"/>
      <button
        type="submit"
        className="bg-amber-600 text-white hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active) duration-300 cursor-pointer justify-center items-center h-10 rounded"
      >Apply</button>
    </form>
  );
};

export default PriceFilter;
 