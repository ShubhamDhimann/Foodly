import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import searchContext from "../context/searchContext"
import cartContext from "../context/cartContext"
import Loader from './Loader';


function FoodCard() {
    const { search, setSearch } = useContext(searchContext);
    const { cart, setCart } = useContext(cartContext);
    const [quantity, setQuantity] = useState([0]);
    const increaseQuantity = (dishID) => setQuantity((qty) => ({ ...qty, [dishID]: (qty[dishID] || 1) + 1 }));
    const decreaseQuantity = (dishID) => setQuantity((qty) => ({ ...qty, [dishID]: (qty[dishID] || 1) - 1 }));
    const [allDishes, setAllDishes] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [addedToCart, setAddedToCart] = useState()
    const [addedDishName, setAddedDishName] = useState("")

    const getFoodData = async () => {
        const { data } = await axios.get("https://foodlybackend-5pwv.onrender.com/getFoodData");
        setAllDishes(data.dishes);
        setAllCategories(data.categories);
    }

    const handleAddToCart = async (e, dishID, dishName, dishQty, dishPrice) => {
        // console.log(dishID, dishName, dishQty, dishPrice);
        let finalPrice = dishPrice * dishQty;
        setCart([...cart, { dishid: dishID, dishname: dishName, dishqty: dishQty, dishprice: finalPrice }]);
        setAddedToCart(true);
        setAddedDishName(dishName);
        // console.log(cart);
    }

    useEffect(() => {
        const addToCartInterval = setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
        return () => clearTimeout(addToCartInterval);
    }, [addedToCart])


    useEffect(() => {
        getFoodData();
    }, []);

    return (

        <div className="min-h-screen p-4 sm:p-6 lg:p-10 bg-gray-100">
            {addedToCart && (
                <div className="fixed bottom-4 right-0  w-full px-4 sm:px-8 z-50">
                    <div className="mx-auto max-w-fit bg-green-500 text-white font-semibold text-xl sm:text-xl px-6 py-3 rounded-lg shadow-[0_0_20px_black] text-center transition-all">
                        {addedDishName} added to cart
                    </div>
                </div>
            )}


            {(allCategories.length === 0 && allDishes.length === 0) ? <Loader /> :
                (allCategories.map((category) => (
                    <div key={category._id} className="mb-12">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-l-4 border-yellow-500 pl-4">
                            {category.CategoryName}
                            <span className="text-sm sm:text-lg font-normal text-gray-500 ml-2">{category.description}</span>
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {allDishes.filter((dish) => (dish.CategoryName === category.CategoryName) && (dish.name.toLowerCase().includes(search.toLowerCase())))
                                .map((dish) => (

                                    <div key={dish._id} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-[0_0_20px_black] hover:scale-105 transition duration-300">
                                        <img src={dish.url} alt={dish.name} className="w-full h-40 sm:h-48 object-cover border-b" />
                                        <div className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold text-lg text-gray-800">{dish.name}</h3>
                                                <span className="text-gray-700 font-medium">₹{dish.price}</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center">
                                                    <button onClick={() => { decreaseQuantity(dish._id) }} className="px-2.5 py-1 border text-xl font-bold rounded hover:bg-gray-100"> - </button>
                                                    <span className="px-3">{quantity[dish._id] || 1}</span>
                                                    <button onClick={() => { increaseQuantity(dish._id) }} className="px-2 py-1 border text-xl font-bold rounded hover:bg-gray-100"> + </button>
                                                </div>

                                                <button onClick={(e) => { handleAddToCart(e, dish._id, dish.name, quantity[dish._id] || 1, dish.price) }} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))
                )
            }
        </div>
    );
}

export default FoodCard;
