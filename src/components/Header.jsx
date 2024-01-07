import React, { useContext, useState } from "react";
import { logoLight, bag } from "../assets/index";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import CartHover from "./CartHover";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [ isTooltipVisible, setTooltipVisible ] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  const navigate = useNavigate();

  const handleClick = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <div className="w-full h-20 bg-white border-b border-b-gray-800 sticky top-0 z-50 md:px-10 sm:px-5">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between lg:px-52">
        <div>
          <a href="/">
            <img src={logoLight} alt="logo" className="md:w-48 sm:w-28 cursor-pointer" />
          </a>
        </div>
        <div>
          <ul className="flex items-center lg:gap-8 sm:gap-2 sm:text-sm md:text-base lg:text-lg">
            <li onClick={() => {window.location.pathname === "/" ? handleClick('app') : navigate('/')}} className="text-black font-bold hover:text-green-400 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Home
            </li>
            <li onClick={() => handleClick('products')} className="text-black font-bold hover:text-green-400 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Shop
            </li>
            <li onClick={() => handleClick('footer')} className="text-black font-bold hover:text-green-400 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Contact
            </li>
            <li className="relative cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img src={bag} alt="bag" className="lg:w-6 sm:w-8" />
              <span className={cart.length > 0 ? "absolute translate-x-[-50%] translate-y-[-50%] top-[100%] left-[100%] text-sm font-semibold font-titleFont bg-green-400 rounded-full flex items-center justify-center px-1" : "absolute translate-x-[-50%] translate-y-[-50%] top-[100%] left-[100%] text-sm font-semibold font-titleFont bg-red-500 rounded-full flex items-center justify-center px-1"}>
                {cart.length}
              </span>
              {isTooltipVisible && <CartHover />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
