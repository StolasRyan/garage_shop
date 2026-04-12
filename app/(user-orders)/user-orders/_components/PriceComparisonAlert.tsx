import { PriceComparison } from "@/types/userOrder";
import { formatPrice } from "@/utils/formatPrice";
import { AlertTriangle, XCircle } from "lucide-react";

interface PriceComparisonAlertProps {
  priceComparison: PriceComparison;
  onClose: () => void;
}

const PriceComparisonAlert = ({
  priceComparison,
  onClose,
}: PriceComparisonAlertProps) => {
  return (
    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-yellow-800 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Warning! Prices or discounts are changed.
          </h3>
          <p className="text-yellow-700 text-sm mb-2">
            From the moment of order creation, the price or discount of the
            product may change. In this case, the order will be recreated with
            actual prices.
          </p>
          {priceComparison.changedItems.length > 0 && (
              <div className="mt-2">
                <p className="text-yellow-800 font-medium text-sm">Changes:</p>
                <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                    {priceComparison.changedItems.map((item, index) => (
                        <li key={index}
                        className="flex flex-col"
                        >
                            <span className="font-medium">{item.productName}</span>
                            <div className="flex flex-wrap gap-4 mt-1">
                                {item.priceChanged && (
                                    <span>
                                        Price: {formatPrice(item.originalPrice)} ₽ → {formatPrice(item.currentPrice)} ₽
                                    </span>
                                )}
                                {item.quantity > 1 && (
                                    <span>
                                        Quantity: x{item.quantity} 
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
              </div>
          )}
            <div className="mt-3 p-2 bg-yellow-100 rounded">
                <p className="text-yellow-800 font-medium text-xs">
                    <span className="block">Price in previous order: {formatPrice(priceComparison.originalTotal)} ₽</span>
                    <span className="block">Amount with actual prices: {formatPrice(priceComparison.currentTotal)} ₽</span>
                    {priceComparison.difference !== 0 &&(
                        <span
                        className={`block ${
                            priceComparison.difference > 0 ? 'text-red-600' : 'text-lime-600'
                        }`}
                        >
                            Changes: {priceComparison.difference > 0 ? '+' : '-'}
                            {formatPrice(priceComparison.difference)} ₽
                        </span>
                    )}
                </p>

            </div>
        </div>
        <button
        onClick={onClose}
        className="text-yellow-600 hover:text-yellow-800 text-lg font-bold ml-4 shrink-0"
        >
            <XCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PriceComparisonAlert;
