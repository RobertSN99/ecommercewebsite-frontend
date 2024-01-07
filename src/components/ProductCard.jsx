import React, { useEffect, useContext } from "react";
import { CartContext, ProductsContext, IsClickedContext } from "../App";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";


const ProductCard = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { isClicked, setIsClicked } = useContext(IsClickedContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFirestore();
      setProducts(data);
    };
    fetchData();
  }, []);

  const fetchDataFromFirestore = async () => {
    const query = await getDocs(collection(db, "products"));
    const data = [];
    query.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  };

  const { cart, setCart } = useContext(CartContext);

  const handleAdd = (id, name, price, url) => {
    const newItem = { id: id, name: name, price: price, url: url, quantity: 1 };
    isItemInCart(id) ? incrementExistingItem(id, price) : addToCart(newItem); // If the item is already in cart, it's adding one more
  };

  const indexOfItem = (id) => {
    return cart.map(item => item.id).indexOf(id)
  }

  const isItemInCart = (id) => {
    return indexOfItem(id) > -1 ? true : false
  }

  const incrementExistingItem = (id, price) => {
    cart[indexOfItem(id)].quantity += 1;
    cart[indexOfItem(id)].price += price;
  }

  const handleRemove = (id, price) => {
    isItemInCart(id) && cart[indexOfItem(id)].quantity > 1 ? decrementExistingItem(id, price) : removeItem(id)
  }

  const removeItem = (id) => {
    setCart(cart.filter(items => items.id !== id))
  }

  const decrementExistingItem = (id, price) => {
    cart[indexOfItem(id)].quantity -= 1;
    cart[indexOfItem(id)].price -= price;
  }


  const addToCart = (item) => {
    setCart((cart) => [...cart, item])
  }

  const getQuantity = (id) => {
    return cart[indexOfItem(id)].quantity
  }

  useEffect(() => {
    if (isClicked) {
      setIsClicked(false);
    }
  }, [isClicked]);

  return (
    <div className="max-w-[80%] flex flex-wrap items-center justify-center mx-auto gap-4 md:px-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="border-green-400 border-2 border-opacity-50 [&>div>button]:hover:opacity-100 [&>div>img]:hover:opacity-50 [&>div>img]:hover:blur-sm cursor-pointer"
        >
          <div className="relative">
            <img
              className="h-auto bg-slate-400 bg-opacity-[25%] py-2 duration-300"
              src={product.url}
              alt=""
            />
            <button
              className={isItemInCart(product.id) ? "absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 md:duration-300 sm:px-2 sm:py-2 md:px-4 md:py-2 px-12 py-3 bg-white bg-opacity-50 border-green-400 rounded-full border-2 hover:bg-opacity-100 active:bg-opacity-100 active:bg-slate-200": "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 duration-300 sm:px-4 sm:py-2 px-12 py-3 bg-white bg-opacity-50 border-green-400 rounded-full border-2 hover:bg-opacity-100 active:bg-opacity-100 active:bg-slate-200"}
              onClick={() => {
                setIsClicked(true);
                handleAdd(
                  product.id,
                  product.name,
                  product.price,
                  product.url
                );
              }}
            >
              ADD TO CART {isItemInCart(product.id) &&  `(${getQuantity(product.id)})`}
            </button>
            {isItemInCart(product.id) &&
            <button
            className="absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 duration-300 sm:px-4 sm:py-2 sm:text-nowrap px-6 py-3 bg-white bg-opacity-50 border-red-400 rounded-full border-2 hover:bg-opacity-100 active:bg-opacity-100 active:bg-slate-200"
            onClick={() => {
              setIsClicked(true);
              handleRemove(
                product.id,
                product.price
              );
            }}
          >
            REMOVE FROM CART
          </button>
            }
          </div>
          <div className="flex flex-col items-center justify-center border-t border-green-400 py-2">
            <h3 className="font-titleFont md:text-lg sm:text-sm sm:text-center">{product.name}</h3>
            <p className="text-[1.3em]">
              {product.price} <span className="text-sm">RON</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
