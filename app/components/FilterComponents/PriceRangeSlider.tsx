import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  values: [number, number] | number[];
  onChangeAction: (values: [number, number]) => void;
}
const PriceRangeSlider = ({min,max, values,onChangeAction }:PriceRangeSliderProps) => {
  return (
     <div className="w-[320px] xl:w-68  px-2 mx-auto">
          <Slider
          range
          min={min}
          max={max}
          value={values}
          onChange={(v)=> Array.isArray(v) && onChangeAction(v as [number, number])}
          />
      </div>
  )
}

export default PriceRangeSlider