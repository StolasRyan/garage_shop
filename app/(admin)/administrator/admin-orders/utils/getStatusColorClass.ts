export const getStatusColorClass = (
  statusLabel: string,
  isSelected: boolean = false
): string => {
  switch (statusLabel) {
    case "New":
    case "Delivering":
      return isSelected ? "bg-[#f3f2f1]" : "text-[#414141]";
    case "Collected":
      return isSelected ? "bg-primary" : "text-primary";
    case "Confirmed":
      return isSelected ? "bg-[#008c49]" : "text-[#008c49]";
    case "Not Confirmed":
      return isSelected ? "bg-[#fca21c]" : "text-[#fca21c]";
    case "Refund":
      return isSelected ? "bg-[#d80000]" : "text-[#d80000]";
    case "Returned":
      return isSelected ? "bg-[#1cb9fc]" : "text-[#1cb9fc]";
    default:
      return isSelected ? "bg-[#f3f2f1]" : "text-[#414141]";
  }
};