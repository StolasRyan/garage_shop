import { XCircle } from "lucide-react";

interface CartControlsProps {
  isAllSelected: boolean;
  selectedItemsCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRemoveSelected: () => void;
}

const CartControls = ({
  isAllSelected,
  selectedItemsCount,
  onSelectAll,
  onDeselectAll,
  onRemoveSelected,
}: CartControlsProps) => {
  return (
  <div className="flex items-center gap-x-10 mb-4 lg:mb-6">
    <label className="flex items-center gap-2 cursor-pointer">
        <input
        type="checkbox"
        checked={isAllSelected}
        onChange={(e)=> (e.target.checked ? onSelectAll() : onDeselectAll())}
        className="hidden"
        />
        <div className="w-6 h-6 bg-primary border border-purple-200 rounded flex items-center justify-center duration-300">
            {isAllSelected ? (
                <div className="w-3.75 h-px bg-white"></div>
            ):(
                <div className="relative w-3.75 h-3.75">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-px h-full bg-white transform -translate-x-1/2"></div>
                </div>
            )}
        </div>
        <span className="text-xs">Select all</span>
    </label>
    {selectedItemsCount > 0 && (
        <button
          onClick={onRemoveSelected}
          className="text-primary hover:underline text-xs cursor-pointer flex items-center gap-1"
        >
          <XCircle size={16} />
          Remove selected
        </button>
      )}
  </div>
);
};

export default CartControls;
