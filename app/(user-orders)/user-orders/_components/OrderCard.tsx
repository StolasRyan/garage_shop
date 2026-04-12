import { useOrderProducts } from "@/app/hooks/useOrderProducts";
import { Order } from "@/types/order";
import OrderHeader from "./OrderHeader";
import { useDeliveryData } from "@/app/hooks/useDeliveryData";
import { useRepeatOrder } from "@/app/hooks/useRepeatOrder";
import DeliveryDatePicker from "./DeliveryDatePicker";
import ProductsSection from "@/app/(products)/ProductsSection";
import { useEffect, useState } from "react";
import OrderActions from "./OrderActions";
import MiniLoader from "@/app/components/Header/MiniLoader";
import OrderDetails from "./OrderDetails";
import { useOrderProductsData } from "@/app/hooks/useOrderProductsData";
import { usePriceComparsion } from "@/app/hooks/usePriceComparsion";
import { useOrderPricing } from "@/app/hooks/useOrderPricing";
import StockWarningsAlert from "./StockWarningsAlert";
import RepeatOrderSection from "./RepeatOrderSection";
import RepeatOrderSuccessAlert from "./RepeatOrderSuccessAlert";

const OrderCard = ({ order }: { order: Order }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPriceWarnings, setShowPriceWarnings] = useState(false);

  const { productsData: fetchedRoductsData, loading: productsDataLoading } =
    useOrderProductsData(order);

  const { orderProducts, stockWarnings } = useOrderProducts(
    order,
    fetchedRoductsData,
  );

  const { currentProducts, priceComparison } = usePriceComparsion(
    order,
    fetchedRoductsData,
  );

  const { cartItemsForSummary, productsData, customPricing } = useOrderPricing(
    order,
    currentProducts,
  );

  const {
    showDatePicker,
    showDeliveryButton,
    handleOrderClick,
    handleDeliveryClick,
    handleDateSelect,
    handleCancelDelivery,
    isRepeatOrderCreated,
    selectedDelivery,
    handleEditDelivery,
    handleRepeatOrderSuccess
  } = useRepeatOrder();

  const { deliverySchedule } = useDeliveryData();

  const hasStockIssues = orderProducts.some(
    (product) => product.isLowStock || product.insufficientStock,
  );
  const canCreateRepeatOrder = !hasStockIssues;
  const applyIndexStyles = !showOrderDetails;

  useEffect(() => {
    if (priceComparison?.hasChanges) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPriceWarnings(true);
    }
  }, [priceComparison?.hasChanges]);

  if (productsDataLoading) return <MiniLoader />;
  return (
    <div className="text-gray-600 ">
      <OrderHeader
        order={order}
        showDeliveryButton={showDeliveryButton}
        onOrderClick={handleOrderClick}
        onDeliveryClick={handleDeliveryClick}
        disabled={hasStockIssues}
      />
      <ProductsSection
        products={orderProducts}
        applyIndexStyles={applyIndexStyles}
        isOrderPage={true}
      />
      <RepeatOrderSection
        isRepeatOrderCreated={isRepeatOrderCreated}
        selectedDelivery={selectedDelivery}
        canCreateRepeatOrder={canCreateRepeatOrder}
        order={order}
        priceComparison={priceComparison}
        showPriceWarnings={showPriceWarnings}
        onClosePriceWarning={() => setShowPriceWarnings(false)}
        deliveryData={selectedDelivery}
        onEditDelivery={handleEditDelivery}
        productsData={productsData}
        cartItemsForSummary={cartItemsForSummary}
        customPricing={customPricing}
        onOrderSuccess={handleRepeatOrderSuccess}
      />
      <StockWarningsAlert
        warnings={stockWarnings}
        hasStockIssues={hasStockIssues}
      />
      {isRepeatOrderCreated && <RepeatOrderSuccessAlert/>}
      <OrderActions
        showOrderDetails={showOrderDetails}
        onToogleDetails={() => setShowOrderDetails(!showOrderDetails)}
      />
      {showOrderDetails && <OrderDetails order={order} />}
      {showDatePicker && (
        <DeliveryDatePicker
          schedule={deliverySchedule}
          isCreatingOrder={false}
          onDateSelect={(date, timeSlot) =>
            handleDateSelect(date, timeSlot, order.deliveryAddress)
          }
          onCancel={handleCancelDelivery}
        />
      )}
    </div>
  );
};

export default OrderCard;
