import { getThreeDaysDates } from "@/app/(admin)/administrator/delivery-times/utils/getThreeDaysDates";
import { Schedule } from "@/types/deliverySchedule";
import { useEffect, useState } from "react";
import { formatTimeSlot } from "../utils/formaTimeSlot";
import { isTimeSlotPassed } from "../utils/isTimeSlotPassed";
import DeliveryTimeSkeletons from "./DeliveryTimeSkeletons";
import { additionalStyles, labelStyles, selectStyles } from "./styles";
import { formStyles } from "@/app/styles";
import { Clock4 } from "lucide-react";

interface DeliveryTimeProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (timeSlot: string) => void;
}
const DeliveryTime = ({
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
}: DeliveryTimeProps) => {
  const [availableDates, setAvailableDates] = useState<
    { value: string; label: string }[]
  >([]);
  const [tooltipSlot, setTooltipSlot] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Schedule>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryTimes = async () => {
      try {
        const response = await fetch("/api/delivery-times");
        const data = await response.json();

        if (data.schedule) {
          setSchedule(data.schedule);
        }
      } catch (error) {
        console.error("Error fetching delivery times:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryTimes();
  }, []);

  useEffect(() => {
    const dates = getThreeDaysDates().map((dateString) => {
      const [year, month, day] = dateString.split("-");
      const formattedDate = `${day}.${month}.${year}`;

      return {
        value: dateString,
        label: formattedDate,
      };
    });
    setAvailableDates(dates);

    if (!selectedDate && dates.length > 0) {
      onDateChange(dates[0].value);
    }
  }, [selectedDate, onDateChange]);

  const getAllTimeSlots = () => {
    if (!schedule[selectedDate]) return [];

    const daySchedule = schedule[selectedDate];
    const slots = Object.keys(daySchedule)
      .sort((a, b) => {
        const [startA] = a.split("-");
        const [startB] = b.split("-");
        return startA.localeCompare(startB);
      })
      .map((slot) => {
        const fomattedSlot = formatTimeSlot(slot);
        const isFree = daySchedule[slot] !== false;
        const isPassed = isTimeSlotPassed(slot, selectedDate);
        const isAvailable = isFree && !isPassed;

        return {
          value: slot,
          mobileLabel: fomattedSlot.mobileLabel,
          desktopLabel: fomattedSlot.desktopLabel,
          free: isAvailable,
          passed: isPassed,
        };
      });

    return slots;
  };

  const handleTimeSlotClick = (slot: {
    value: string;
    free: boolean;
    passed?: boolean;
  }) => {
    if (slot.free && !slot.passed) {
      onTimeSlotChange(slot.value);
    }
  };

  const timeSlots = getAllTimeSlots();

  if (loading) return <DeliveryTimeSkeletons />;

  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold mb-6">Time to deliver:</h2>
      <div className="relative flex flex-col gap-y-4 md:flex-row md:flex-nowrap md:gap-x-8 lg:gap-x-10">
        <div>
          <label className={`${labelStyles} text-sm lg:text-base`}>Date</label>
          <select
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className={`${formStyles.input} ${additionalStyles} ${selectStyles} [&&]:md:w-38.75 [&&]:text-base`}
          >
            {availableDates.map((date) => (
              <option value={date.value} key={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className={`${labelStyles} text-sm lg:text-base`}>Time</label>
          {timeSlots.length === 0 ? (
            <div className="text-center bg-red-100 py-2 text-red-500 rounded">
              No delivery times available for the selected date.
            </div>
          ) : (
            <div className="text-base grid grid-cols-3 lg:grid-cols-4 gap-2 w-full">
              {timeSlots.map((slot) => (
                <div
                  key={slot.value}
                  className="relative"
                  onMouseEnter={() =>
                    (!slot.free || slot.passed) && setTooltipSlot(slot.value)
                  }
                  onMouseLeave={() => setTooltipSlot(null)}
                  onTouchStart={() =>
                    (!slot.free || slot.passed) && setTooltipSlot(slot.value)
                  }
                  onTouchEnd={() => setTooltipSlot(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleTimeSlotClick(slot)}
                    className={`p-2 rounded justify-center items-center w-full h-10 duration-300 ${
                      selectedTimeSlot === slot.value &&
                      slot.free &&
                      !slot.passed
                        ? "bg-primary text-white hover:shadow-button-default active:shadow-button-active"
                        : slot.free && !slot.passed
                          ? "bg-gray-100 hover:shadow-button-secondary cursor-pointer"
                          : "bg-white opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!slot.free || slot.passed}
                  >
                    <span className="lg:hidden text-sm">
                      {slot.mobileLabel}
                    </span>

                    <span className="hidden lg:block text-base">
                      {slot.desktopLabel}
                    </span>
                  </button>

                  {(!slot.free || slot.passed) &&
                    tooltipSlot === slot.value && (
                      <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                        <div className="bg-[#f4f6fb] text-[#151515] text-sm rounded-[5px] p-2 flex items-center gap-2 whitespace-nowrap shadow-lg">
                          <Clock4 size={16} />
                          {slot.passed
                            ? "This time slot has passed"
                            : "This time slot is not available"}
                        </div>

                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#f4f6fb]"></div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;
