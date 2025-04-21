import axios from 'axios'
import React, { useState, useEffect } from 'react'

const MyOrders = () => {
  const [error, setError] = useState("")
  const [orderHistory, setOrderHistory] = useState([])

  const userEmail = localStorage.getItem("userEmail")
  // console.log(userEmail);
  useEffect(() => {
    axios.get("https://foodlybackend-5pwv.onrender.com/getOrders", { params: { userEmail } })
      .then((res) => {
        console.log(res);
        setOrderHistory(res.data.orders)
        console.log(orderHistory);
      })
      .catch((err) => {
        console.log("got a new one", err);

        setError(err.message)
      })

  }, [])
  // console.log(orderHistory);


  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {(!error && orderHistory.length === 0 ) &&  (
        <div className="text-center text-gray-700 bg-gray-200 py-2 rounded-xl font-bold text-2xl mt-[20vh]">
          Your Order List is Empty...🥲 <br />
          You should order some of our food 😋<br />
          Trust me bro, You won't regret it 😉
        </div>
      )}

      {(!error && orderHistory.length!== 0  ) && (
        <div className="space-y-6">
          {orderHistory.map((order, index) => (
            <div key={index} className="bg-gray-200 shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
                <span className="text-gray-500">{order.time}</span>
              </div>

              <div className="space-y-3">
                {order.cart.map((dish, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-2">
                    <div className="text-gray-800">{dish.dishname} &nbsp; <b>x{dish.dishqty}</b></div>
                    <div className="text-green-600 font-medium">₹ {dish.dishprice}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4 font-bold text-lg">
                Total: ₹ {order.cart.reduce((total, item) => total + (item.dishprice * item.dishqty), 0)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
