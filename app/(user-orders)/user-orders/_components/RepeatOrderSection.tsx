import PriceComparisonAlert from "./PriceComparisonAlert";
import PricePreservedAlert from "./PricePreservedAlert";
import DeliveryInfo from "./DeliveryInfo";
import CartSummary from "@/app/components/CartSummary";
import { RepeatOrderSectionProps } from "@/types/userOrder";

const RepeatOrderSection = ({
  isRepeatOrderCreated,
  selectedDelivery,
  canCreateRepeatOrder,
  order,
  priceComparison,
  showPriceWarnings,
  onClosePriceWarning,
  deliveryData,
  onEditDelivery,
  productsData,
  cartItemsForSummary,
  customPricing,
  onOrderSuccess
}: RepeatOrderSectionProps) => {
  if (!selectedDelivery || !canCreateRepeatOrder || isRepeatOrderCreated)
    return null;
  return (
    <div className="mt-6 p-6 roubded bg-gray-200">
      <h3 className="text-lg font-semibold mb-4">Create repeating order</h3>
      {showPriceWarnings && priceComparison?.hasChanges && (
        <PriceComparisonAlert
          priceComparison={priceComparison}
          onClose={onClosePriceWarning}
        />
      )}
      {priceComparison && !priceComparison.hasChanges && (
        <PricePreservedAlert orderTotal={order.totalAmount} />
      )}
      {deliveryData && (
        <DeliveryInfo delivery={deliveryData} onEdit={onEditDelivery} />
      )}
      <CartSummary
        deliveryData={deliveryData!}
        productsData={productsData}
        isRepeatOrder={true}
        customCartItems={cartItemsForSummary}
        customPricing={customPricing}
        onOrderSuccess={onOrderSuccess}
      />
    </div>
  );
};

export default RepeatOrderSection;
