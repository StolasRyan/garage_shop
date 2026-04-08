import InStockToogle from "@/app/components/Header/InStockToogle";
import { CONFIG } from "@/config/config";
import { useCartStore } from "@/store/cartStore";
import { getBonusesWord } from "@/utils/bonusWord";
import React from "react";



const BonusesSection = ({
 
}) => {
  const {pricing,isOrdered, useBonuses,setUseBonuses}=useCartStore();
  const {totalPrice, maxBonusUse}=pricing;

  if(maxBonusUse <= 0) return null;
  return (
    <div className="flex flex-col gap-y-5 text-base pb-6 border-b-2 border-gray-200">
      <div className="flex flex-row items-center gap-x-2.5">
        <InStockToogle
          checked={useBonuses}
          onChangeAction={isOrdered ? () => {} : setUseBonuses}
        />
        <p>
          Use bonuses{" "}
          {Math.min(
            maxBonusUse,
            Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100),
          )}{" "}
          ₽
        </p>
      </div>
      <div className="text-gray-500">
        {` You have ${maxBonusUse} bonus ${getBonusesWord(maxBonusUse)}`}
      </div>
    </div>
  );
};

export default BonusesSection;
