"use client";
import { ChangeEvent } from "react";
import { formStyles } from "../../styles";
import IconVision from "@/app/components/svg/IconVision";
import Tooltip from "./Tooltip";
import { isPasswordValid } from "@/utils/validation/passworValid";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibilityAction: () => void;
  showRequirements?: boolean;
  compareWith?: string;
  inputClass?:string
}
const PasswordInput = ({
  id,
  label,
  value,
  onChangeAction,
  showPassword,
  togglePasswordVisibilityAction,
  showRequirements,
  compareWith,
  inputClass = ''
}: PasswordInputProps) => {
 
  const shoulShowTooltip = () => {
    if (showRequirements) {
      return value.length > 0 && !isPasswordValid(value);
    }
    if (compareWith) {
      return (
        value.length > 0 && compareWith.length > 0 && value !== compareWith
      );
    }
    return false;
  };

  const getTooltipText = () => {
    if (showRequirements) {
      return "Password must be at least 6+ letters and numbers.";
    }
    return "Passwords do not match.";
  };
  return (
    <div className="relative">
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChangeAction}
          className={`${formStyles.input} ${inputClass}`}
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readonly")}
        />
        <button
          type="button"
          onClick={togglePasswordVisibilityAction}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <IconVision showPassword={showPassword} />
        </button>
      </div>
      {shoulShowTooltip() && <Tooltip text={getTooltipText()} />}
    </div>
  );
};

export default PasswordInput;
