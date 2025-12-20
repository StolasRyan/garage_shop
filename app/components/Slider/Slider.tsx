"use client";
import { motion } from "framer-motion";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";

const Slider = () => {
  const slides = [<SlideOne key='slide1' />, <SlideTwo key='slide2' />];
  return (
    <div >
      {slides.map((slide, index) => (
        <motion.div
          key={`slide-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0,1,1,0] }}
          exit={{ opacity: 0 }}
          transition={{
             duration: 5,
             repeat: Infinity,
             repeatDelay: slides.length * 5 - 5,
             delay: index * 5
            }}
            className="absolute w-full h-full"
        >
          {slide}
        </motion.div>
      ))}
    </div>
  );
};

export default Slider;
