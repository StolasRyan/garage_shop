import Maps from "./components/Maps";
import Sales from "./(products)/Sales";
import Slider from "./components/Slider/Slider";
import SpecialOffers from "./components/SpecialOffers";
import Articles from "./(articles)/Articles";
import NewProducts from "./(products)/NewProducts";
import Purchaes from "./(user)/Purchases";

export default function Home() {
  return (

    <main className="w-full mx-auto mb-20  ">
      {/* <Slider/> */}
      <div className=" px-[max(12px, calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30">
        <Sales/>
        <NewProducts/>
        <Purchaes/>
        <SpecialOffers/>
        <Maps/>
        <Articles/>
      </div>
      
    </main>


    
  );
}
