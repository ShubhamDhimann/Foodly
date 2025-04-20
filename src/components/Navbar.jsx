import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import cartContext from "../context/cartContext"
import axios from "axios";

const Navbar = () => {
  const { cart, setCart } = useContext(cartContext)
  const [orderPlacingError, setOrderPlacingError] = useState("")
  const [order, setOrder] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const Navigate = useNavigate()

  // console.log(cart);

  const handleCartClick = (e) => {
    e.stopPropagation();
    setCartOpen(!cartOpen)
    // console.log("propogation stopped and cart is: ", cartOpen);
  }

  const handlePlaceOrder = () => {
    const orderData = {
      userEmail: localStorage.getItem("userEmail"),
      time: new Date().toLocaleString(),
      cart
    }
    // console.log(orderData);
    axios.post("http://localhost:3000/placeOrder", orderData)
      .then((response) => {
        alert("Order Placed Successfully!")
        setCart([]);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Navigate("/");
    // console.log("logout clicked");
  }



  return (
    <nav className="sticky top-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50 transition-all">
      <NavLink to="/" className="text-xl font-semibold">Foodly</NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-gray-700">
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `hover:text-gray-900 transition-all ${isActive ? "scale-105 font-bold" : ""}`} >
          Home
        </NavLink>
        {localStorage.getItem("authToken") && <NavLink to="/myorders" className={({ isActive }) => `hover:text-gray-900 transition-all ${isActive ? "scale-105 font-bold" : ""}`}>My Orders</NavLink>}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4 items-center">

        {localStorage.getItem("authToken") && (
          <div className="flex items-center gap-4">
            <div onClick={() => { setCartOpen(!cartOpen) }} className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm flex items-center justify-center">
              Cart<FaCartShopping className="text-lg ml-2" />
            </div>
            <button onClick={handleLogout} className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg transition-all">Logout</button>
          </div>
        )}
        {!localStorage.getItem("authToken") && (<div className="flex gap-4 items-center"> <NavLink to="/login" className="hover:scale-105 transition-all text-gray-900 text-sm font-bold">LOG IN</NavLink>
          <NavLink to="/signup" className="hover:scale-105 transition-all bg-gray-900 text-white font-bold text-sm px-4 py-2 rounded-lg">SIGN UP</NavLink> </div>)}

        {cartOpen && (
          <div className="absolute flex flex-col right-2 top-20 rounded-2xl bg-white shadow-2xl border border-gray-300 md:w-1/2 w-[90%] h-[70vh] z-40 p-6 overflow-hidden transition-all duration-300 ease-in-out">

            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white text-xl px-4 py-2.5 rounded-full shadow-md transition-all"
            >
              <FaTimes className="text-white text-xl" />
            </button>

            <h2 className="text-2xl font-extrabold mb-4 text-gray-800 border-b pb-2">
              🛒 Your Cart
            </h2>

            <div className="flex flex-col justify-between h-full overflow-hidden">

              <div className="overflow-y-auto pr-2 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 italic text-center mt-10">
                    Your cart is empty... fill it like your stomach 🫃
                  </p>
                ) : (
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}
                        className="flex justify-between items-center px-2 py-1 rounded-lg  hover:bg-gray-200 transition-all"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{item.dishname}</p>
                          <p className="text-sm text-gray-500">Qty: {item.dishqty}</p>
                        </div>
                        <p className="text-gray-700 font-medium">₹{item.dishprice}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  {/* Total */}
                  <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-4">
                    <span>Total:</span>
                    <span>₹{cart.reduce((acc, item) => acc + item.dishprice, 0)}</span>
                  </div>

                  <button onClick={handlePlaceOrder} className="w-full bg-gray-800 hover:bg-gray-700 text-white cursor-pointer text-lg py-3 rounded-xl transition-all shadow-lg">
                    Place Order 😋👌
                  </button>
                </div>
              )}
            </div>
          </div>
        )}




      </div>

      {/* Mobile Menu */}
      <div className="flex items-center gap-5 md:hidden text-2xl cursor-pointer" >
        <div onClick={(e) => { handleCartClick(e) }} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center">
          <FaCartShopping className="text-lg" />
        </div>
        {cartOpen && (
          <div className="absolute flex flex-col right-2 top-20 rounded-2xl bg-white shadow-2xl border border-gray-300 md:w-1/2 w-[90%] h-[70vh] z-40 p-6 overflow-hidden transition-all duration-300 ease-in-out">
            <button onClick={() => setCartOpen(false)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white text-xl px-4 py-2.5 rounded-full shadow-md transition-all">
              <FaTimes className="text-white text-xl" />
            </button>

            <h2 className="text-2xl font-extrabold mb-4 text-gray-800 border-b pb-2"> 🛒 Your Cart </h2>

            <div className="flex flex-col justify-between h-full overflow-hidden">

              <div className="overflow-y-auto pr-2 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 italic text-center mt-10">
                    Your cart is empty... fill it like your stomach 🫃
                  </p>
                ) : (
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}
                        className="flex justify-between items-center px-2 py-1 rounded-lg  hover:bg-gray-200 transition-all"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{item.dishname}</p>
                          <p className="text-sm text-gray-500">Qty: {item.dishqty}</p>
                        </div>
                        <p className="text-gray-700 font-medium">₹{item.dishprice}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  {/* Total */}
                  <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-4">
                    <span>Total:</span>
                    <span>₹{cart.reduce((acc, item) => acc + item.dishprice, 0)}</span>
                  </div>

                  <button onClick={handlePlaceOrder} className="w-full bg-gray-800 hover:bg-gray-700 text-white cursor-pointer text-lg py-3 rounded-xl transition-all shadow-lg">
                    Place Order 😋👌
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isOpen ? <FaTimes onClick={toggleMenu} /> : <FaBars onClick={toggleMenu} />}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-white flex flex-col gap-4 py-6 px-8 shadow-lg md:hidden z-50 transition-all">
          <NavLink to="/" onClick={closeMenu} className="text-gray-700 hover:text-black">Home</NavLink>
          {localStorage.getItem("authToken") &&
            <NavLink to="/myorders" className="text-gray-700 hover:text-black">My Orders</NavLink>
          }
          <hr />

          {localStorage.getItem("authToken") && (
            <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all shadow-sm text-center">
              <button onClick={handleLogout} className="">Logout</button>
            </div>
          )}

          {!localStorage.getItem("authToken") && (<div className="flex flex-col">
            <NavLink to="/login" onClick={closeMenu} className="text-sm font-bold bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-center">LOG IN</NavLink>
            <NavLink to="/signup" onClick={closeMenu} className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-lg text-center">SIGN UP</NavLink>
          </div>)}



        </div>
      )}
    </nav>
  );
}


export default Navbar;
