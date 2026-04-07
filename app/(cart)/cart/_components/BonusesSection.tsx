import InStockToogle from "@/app/components/Header/InStockToogle";
import { CONFIG } from "@/config/config";
import { getBonusesWord } from "@/utils/bonusWord";
import React from "react";

interface BonusesSectionProps {
  bonusesCount: number;
  useBonuses: boolean;
  onUseBonusesChange: (value: boolean) => void;
  totalPrice: number;
}

const BonusesSection = ({
  bonusesCount,
  totalPrice,
  useBonuses,
  onUseBonusesChange,
}: BonusesSectionProps) => {
  return (
    <div className="flex flex-col gap-y-5 text-base pb-6 border-b-2 border-gray-200">
      <div className="flex flex-row items-center gap-x-2.5">
        <InStockToogle
          checked={useBonuses}
          onChangeAction={onUseBonusesChange}
        />
        <p>
          Use bonuses{" "}
          {Math.min(
            bonusesCount,
            Math.floor((totalPrice * CONFIG.MAX_BOUSES_PERCENT) / 100),
          )}{" "}
          ₽
        </p>
      </div>
      <div className="text-gray-500">
        {` You have ${bonusesCount} bonus ${getBonusesWord(bonusesCount)}`}
      </div>
    </div>
  );
};

export default BonusesSection;
