import { DeliveryData } from "@/types/cart";

interface DeliveryInfoProps {
  delivery: DeliveryData;
  onEdit: () => void;
}
const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ delivery, onEdit }) => {
  return(
    <div className="mb-4">
        <p className="text-sm text-gray-600">
            <strong>Delivery time:</strong>{' '}
            {new Date(delivery.time.date).toLocaleDateString()} {delivery.time.timeSlot}
        </p>
        <button
        className="mt-2 text-gray-600 hover:underline text-sm cursor-pointer"
            onClick={onEdit}>
                Change delivery time
        </button>
    </div>
  )
};

export default DeliveryInfo;
