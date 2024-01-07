import React from "react";
import { banner1, banner2, banner3 } from "../assets/index";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [banner1, banner2, banner3];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[650px] sm:h-[500px] relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-[1000ms]"
        >
          <img
            src={data[0]}
            alt="ImgOne"
            className="w-screen h-auto object-cover"
            loading="priority"
          />
          <img
            src={data[1]}
            alt="ImgOne"
            className="w-screen h-auto object-cover"
          />
          <img
            src={data[2]}
            alt="ImgOne"
            className="w-screen h-auto object-cover"
          />
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-16">
          <div
            onClick={prevSlide}
            className="w-20 h-12 border-[1px] border-gray-700 bg-gray-100 bg-opacity-50 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-20 h-12 border-[1px] border-gray-700 bg-gray-100 bg-opacity-50 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
