import React, { useContext, useEffect, useState } from "react";
import { CartContext, IsClickedContext } from "../App";
import { loadStripe } from "@stripe/stripe-js";
import { FaTrash } from "react-icons/fa";

const CartHover = () => {
  const { cart, setCart } = useContext(CartContext);
  const { isClicked, setIsClicked } = useContext(IsClickedContext);

  const defaultCartStyles =
    "z-10 absolute lg:opacity-0 lg:hover:opacity-100 duration-300 ease-in-out lg:top-[8.7rem] lg:left-[-200%] lg:translate-x-[-50%] lg:translate-y-[-50%] bg-[#212121] text-white cursor-default flex flex-col items-center justify-start lg:max-w-[40rem] lg:w-[40rem] md:max-w-[30rem] md:w-[30rem] sm:w-96 sm:fit sm:max-h-96 overflow-auto rounded-md text-sm sm:translate-x-[-90%]";
  const emptyCartStyles =
    "z-10 absolute lg:opacity-0 lg:hover:opacity-100 duration-300 ease-in-out lg:top-[6.3rem] lg:left-[-200%] translate-x-[-50%] translate-y-[-50%] bg-[#212121] text-white cursor-default flex items-center justify-center lg:w-[20rem] lg:h-48 overflow-auto rounded-md text-sm sm:w-[13rem] sm:h-28 sm:top-[4.5rem] sm:left-[-260%] sm:top-[3.5rem] sm:left-[-3.5rem] md:left-[-2.3rem]";
  const [styles, setStyles] = useState(emptyCartStyles);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

  const makePayment = async () => {
    const stripe = await loadStripe(
      `${STRIPE_KEY}`
    );

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${BACKEND_URL}/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const totalPrice = () => {
    var result = 0;
    cart.map((item) => {
      result += item.price;
    });
    return result;
  };

  const totalQuantity = () => {
    var result = 0;
    cart.map((item) => {
      result += item.quantity;
    });
    return result;
  };

  const isCartEmpty = () => {
    return cart.length == 0 ? true : false;
  };

  useEffect(() => {
    isCartEmpty() ? setStyles(emptyCartStyles) : setStyles(defaultCartStyles);
  });

  const handleAdd = (id, name, price, url) => {
    const newItem = { id: id, name: name, price: price, url: url, quantity: 1 };
    isItemInCart(id) ? incrementExistingItem(id) : addToCart(newItem); // If the item is already in cart, it's adding one more
  };

  const indexOfItem = (id) => {
    return cart.map((item) => item.id).indexOf(id);
  };

  const isItemInCart = (id) => {
    return indexOfItem(id) > -1 ? true : false;
  };

  const incrementExistingItem = (id) => {
    let quantity = cart[indexOfItem(id)].quantity;
    let _price = cart[indexOfItem(id)].price;
    cart[indexOfItem(id)].quantity += 1;
    cart[indexOfItem(id)].price += _price / quantity;
  };

  const handleRemove = (id) => {
    isItemInCart(id) && cart[indexOfItem(id)].quantity != 1
      ? decrementExistingItem(id)
      : removeItem(id);
  };

  const removeItem = (id) => {
    setCart(cart.filter((items) => items.id !== id));
  };

  const decrementExistingItem = (id) => {
    let quantity = cart[indexOfItem(id)].quantity;
    let _price = cart[indexOfItem(id)].price;
    cart[indexOfItem(id)].quantity -= 1;
    cart[indexOfItem(id)].price -= _price / quantity;
  };

  const addToCart = (item) => {
    setCart((cart) => [...cart, item]);
  };

  useEffect(() => {
    if (isClicked) {
      setIsClicked(false);
    }
  }, [isClicked]);

  const handleTrash = () => {
    setCart([]);
  };

  return (
    <div className={`${styles}`}>
      <div className="w-full flex items-center flex-col justify-center">
        {cart.length == 0 && (
          <div className="flex items-center justify-center">
            Your cart is empty!
          </div>
        )}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full lg:pr-24 sm:pr-3 border-b border-white"
          >
            <div>
              <img src={item.url} className="lg:w-36 sm:w-28" />
            </div>
            <div className="relative lg:max-w-48 lg:min-w-48 sm:max-w-28 sm:min-w-28 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.name}
            </div>
            <div className="flex-grow-2">
              <button
                className="p-2 text-lg text-red-400"
                onClick={() => {
                  setIsClicked(true);
                  handleRemove(item.id);
                }}
              >
                -
              </button>
              x{item.quantity}
              <button
                className="p-2 text-lg text-green-400"
                onClick={() => {
                  setIsClicked(true);
                  handleAdd(item.id, item.name, item.price, item.url);
                }}
              >
                +
              </button>
            </div>
            <div>{item.price} RON</div>
          </div>
        ))}
        {cart.length != 0 && (
          <div className="flex items-center flex-col justify-center w-full">
            <div className="flex items-center justify-between w-full px-5 py-3 border-b-[1px] border-white">
              <span className="">TOTAL</span>
              <span className="">
                {totalQuantity()}{" "}
                {totalQuantity() == 1 ? "product" : "products"}
              </span>
              <span className="">{totalPrice()} RON</span>
            </div>
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={makePayment}
                className="my-3 p-4 border-[1px] duration-300 bg-opacity-0 bg-slate-300 border-green-400 rounded-full hover:bg-opacity-25 active:bg-opacity-50 active:bg-slate-200"
              >
                Go to checkout
              </button>
              <button onClick={handleTrash} className="relative">
                <FaTrash className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-red-500 cursor-pointer text-lg hover:text-2xl active:text-red-200 active:rotate-45 duration-300 ease-in-out" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartHover;
