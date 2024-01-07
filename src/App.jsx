import { createContext, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./pages/Success";

export const CartContext = createContext();
export const ProductsContext = createContext();
export const IsClickedContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div id="app" className="font-bodyFont">
      <BrowserRouter>
        <CartContext.Provider value={{ cart, setCart }}>
          <ProductsContext.Provider value={{ products, setProducts }}>
            <IsClickedContext.Provider value={{ isClicked, setIsClicked }}>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/successful-payment" element={<Success />} />
              </Routes>
            </IsClickedContext.Provider>
            <Footer />
          </ProductsContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
