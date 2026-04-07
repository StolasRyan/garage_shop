interface AddTimeSlotFormProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onAddTimeSlot: () => void;
}

const AddTimeSlotForm = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onAddTimeSlot,
}: AddTimeSlotFormProps) => {
  return (
    <div className="bg-white p-3 md:p-4 rounded border border-gray-200 mb-4 md:mb-6">
      <h1 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">
        Add time slot for all days
      </h1>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center md:items-end justify-center">
        <div className="w-33">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="border rounded px-3 py-2 w-full text-sm md:text-base"
          />
        </div>

        <div className="w-33">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="border rounded px-3 py-2 w-full text-sm md:text-base"
          />
        </div>

        <button
          onClick={onAddTimeSlot}
          className="bg-primary text-white hover:shadow-button-default active:shadow-button-active py-2 px-3 md:px-4 rounded whitespace-nowrap text-sm md:text-base w-full md:w-auto duration-300 cursor-pointer"
        >
          Add Slot
        </button>
      </div>
    </div>
  );
};

export default AddTimeSlotForm;
