import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "../daypicker.css";

interface CalendarProps {
  customDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date | undefined) => void;
}

const Calendar = ({
  customDate,
  onDateSelect,
  onMonthChange,
}: CalendarProps) => {
  const getMonthName = (date: Date) => {
    const monthName = date.toLocaleDateString("en-GB", { month: "long" });
    const capitalizedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const year = date.getFullYear();
    return `${capitalizedMonthName} ${year}`;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(customDate || new Date());
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(customDate || new Date());
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };
  return (
    <div className="absolute top-17 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-600">
          {customDate ? getMonthName(customDate) : "Select month"}
        </span>
        <div className="flex gap-x-4 justify-center">
          <button
            onClick={handlePreviousMonth}
            className="p-2 bg-gray-100 hover:bg-primary text-gray-600 hover:text-white rounded duration-300 cursor-pointer"
          >
            <ArrowLeftSquare size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-gray-100 hover:bg-primary text-gray-600 hover:text-white rounded duration-300 cursor-pointer"
          >
            <ArrowRightSquare size={20} />
          </button>
        </div>
      </div>
      <DayPicker
        mode="single"
        selected={customDate}
        onSelect={onDateSelect}
        // locale={}
        showOutsideDays={true}
        className="p-0"
        classNames={{
          root: "w-full",
          month: "w-full",
          caption: "hidden",
          nav: "hidden",
          table: "w-full border-collapse",
          head_row: "border-b",
          head_cell: "font-normal py-2 text-sm",
          row: "border-b",
          cell: "h-10 text-center",
          day: "size-10 rounded-full text-[#606060] hover:text-white hover:bg-primary duration-300 cursor-pointer mx-auto",
          day_selected: "bg-primary !text-white",
          day_today: "bg-gray-100 !text-white",
          day_outside: "text-gray-500 opacity-50",
        }}
       modifiersStyles={{
          selected: {
            color: "white",
            backgroundColor: "#3b3787",
            border: "none",
          },
          today: {
            color: "white",
            backgroundColor: "#3b3787",
            border: "none",
          },
        }}
      />
    </div>
  );
};

export default Calendar;
