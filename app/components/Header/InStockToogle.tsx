'use client';
interface InStockToogleProps {
    checked: boolean;
    onChangeAction: (checked: boolean) => void;
    labelText?: string
}
const InStockToogle = ({checked, onChangeAction,labelText}:InStockToogleProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="inStock"
          checked={checked}
          onChange={(e)=>onChangeAction(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11.5 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#394268] transition-colors duration-200">
          <div
            className={`absolute top-0.5 left0 w-5 h-5 border border-[rgba(0,0,0,0.04)] 
          rounded-full shadow-[0px_1px_1px_rgba(0,0,0,0.08), 0px_2px_6px_rgba(0,0,0,0.15)]
          bg-white transition-transform duration-300 
          ${checked ? "translate-x-6" : "translate-x-0"}`}
          ></div>
        </div>
        <span className="ml-2 text-sm text-gray-900">{labelText}</span>
      </label>
    </div>
  );
};

export default InStockToogle;
