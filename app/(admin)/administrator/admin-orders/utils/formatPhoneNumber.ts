export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");

  // Белорусский номер: 12 цифр (375XXXXXXXXX)
  if (cleaned.length === 12 && cleaned.startsWith("375")) {
    return `+375 ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8, 10)} ${cleaned.substring(10, 12)}`;
  } 
  // Российский номер: 10 цифр (9XXXXXXXXX) или 11 с 7
  else if (cleaned.length === 11 && cleaned.startsWith("7")) {
    return `+7 ${cleaned.substring(1, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7, 9)} ${cleaned.substring(9, 11)}`;
  }
  else if (cleaned.length === 10) {
    return `+7 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
  }
  
  // Если формат не распознан, возвращаем как есть
  return `+${cleaned}`;
};