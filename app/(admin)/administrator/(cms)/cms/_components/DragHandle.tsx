import { GripVertical } from "lucide-react";

export const DragHandle = () => {
  return (
    <div
      title="Drag to sort"
      className="text-gray-400 flex items-center justify-center cursor-grab active:cursor-grabbing hover:opacity-100 transition-opacity p-2"
    >
      <GripVertical className="w-5 h-5" />
    </div>
  );
};
