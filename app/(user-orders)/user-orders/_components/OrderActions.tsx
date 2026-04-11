import { EyeIcon, EyeOffIcon } from "lucide-react";


interface OrderActionsProps {
    showOrderDetails: boolean;
    onToogleDetails: () => void
}
const OrderActions: React.FC<OrderActionsProps> = ({showOrderDetails, onToogleDetails}) => {
  return (
    <div className="flex justify-center mt-10">
        <button
        onClick={onToogleDetails}
        className="bg-[#f3f2f1] hover:shadow-button-secondary w-50 h-10 px-2 flex justify-center items-center gap-2 rounded duration-300 cursor-pointer"
        >
            {showOrderDetails ? (<><EyeOffIcon size={20} />Hide details</>) : (<><EyeIcon size={20} />Show details</>)}
        </button>
    </div>
  )
}

export default OrderActions