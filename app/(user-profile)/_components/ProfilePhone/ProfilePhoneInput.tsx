import { formStyles } from "@/app/styles";
import { InputMask } from "@react-input/mask";
import { Phone } from "lucide-react";
import { useMemo } from "react";

interface ProfilePhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ProfilePhoneInput = ({
  value,
  onChange,
  disabled,
}: ProfilePhoneInputProps) => {

  const maskedValue = useMemo(() =>{
    if(!value) return '';
    
    const cleanedPhone = value.replace(/\D/g, '');

    let formatted = '+375 ';

    if(cleanedPhone.length > 3){
      formatted += `(${cleanedPhone.slice(3,5)}`
    }
    if(cleanedPhone.length > 5){
      formatted += `) ${cleanedPhone.slice(5,8)}`
    }
    if(cleanedPhone.length > 8){
      formatted += `-${cleanedPhone.slice(8,10)}`
    }
     if(cleanedPhone.length > 10){
      formatted += `-${cleanedPhone.slice(10,12)}`
    }

    return formatted
  },[value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const cleaned = e.target.value.replace(/\D/g, '');

  let normalized: string;

  if (cleaned.startsWith('375')) {
    normalized = cleaned;                    // +375291234567 → уже готово
  } else if (cleaned.startsWith('80')) {
    normalized = '375' + cleaned.slice(2);   // 80291234567 → 375291234567
  } else if (cleaned.startsWith('8')) {
    normalized = '375' + cleaned.slice(1);   // 8291234567 → 375291234567
  } else if (cleaned.startsWith('7')) {
    normalized = '375' + cleaned.slice(1);   // 7291234567 → 375291234567
  } else {
    normalized = '375' + cleaned;            // 291234567 → 375291234567
  }

  if (normalized.length <= 12) {
    onChange(normalized);
  }
  }

  return (
    <div className="relative">
      <InputMask
        mask="+375 (__) ___-__-__"
        replacement={{ _: /\d/ }} 
        placeholder="+375 (__) ___-__-__"
        value={maskedValue}
        onChange={handleChange}
        className={`${formStyles.input} [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-gray-200`}
        disabled={disabled}
      />
      <Phone className="absolute right-3 top-0 transform translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default ProfilePhoneInput;
