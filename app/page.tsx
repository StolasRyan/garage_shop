import Maps from "./components/Maps";
import Sales from "./(products)/Sales";
import Slider from "./components/Slider/Slider";
import SpecialOffers from "./components/SpecialOffers";
import Articles from "./(articles)/Articles";
import NewProducts from "./(products)/NewProducts";
import Purchaes from "./(user)/Purchases";
import { Suspense } from "react";
import { Loader } from "./components/Loader";


export default function Home() {
  return (

    <main className="w-full mx-auto mb-20  ">
      {/* <Slider/> */}
      <div className=" px-[max(12px, calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30">
      {[
        {component: <Sales/> , text: 'sales'},
        {component: <NewProducts/>, text: 'new products'},
        {component: <Purchaes/>, text: 'purchases'},
        {component: <SpecialOffers/>, text: 'special offers'},
        {component: <Maps/>, text: 'maps'},
        {component: <Articles/>, text: 'articles'},
      ].map((item,index)=>(
        <Suspense key={index} fallback={<Loader text={item.text}/>}>
          {item.component}
        </Suspense>
      ))}
        

        
        
        
        
      </div>
      
    </main>


    
  );
}
