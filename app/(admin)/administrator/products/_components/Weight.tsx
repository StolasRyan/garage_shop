import { formStyles } from "@/app/styles";

interface WeightProps {
    weight: string;
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Weight = ({ weight, onChangeAction }: WeightProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Weight (kilo) <span className="text-red-700">*</span>
      </label>
      <input
        type="number"
        name="weight"
        step={`0.01`}
        value={weight}
        onChange={onChangeAction}
        className={`${formStyles.input} bg-white [&&]:w-full`}
      />
    </div>
  );
};

export default Weight;
