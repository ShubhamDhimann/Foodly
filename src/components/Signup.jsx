import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(data);
        setServerError("");
        try {
            const res = await axios.post("http://localhost:3000/signup", data)
            // console.log(res.data.token);
            // const {token} = res.data.token;
            // localStorage.setItem("userEmail", )
            res.status == 201 && 
                localStorage.setItem("authToken", res.data.token)
                localStorage.setItem("userEmail", res.data.newUser.email)
                // console.log(localStorage.getItem("authToken"))
                // console.log(localStorage.getItem("userEmail"))
                navigate("/")

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setServerError(error.response.data.error);
            } else {
                setServerError("An unexpected error occurred. Please try again.");
            }
            console.error("Axios error:", error)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <NavLink to="/" className="absolute top-4 left-4 flex items-center gap-2 font-medium text-gray-700 hover:text-black hover:font-bold transition-all">
                <FaArrowLeft /> Return to Home Page </NavLink>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign Up</h2>
                {serverError && <p className="text-red-600 text-sm mb-4 text-center">{serverError}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })} type="text" placeholder='Enter Your Name'
                        className={`mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" }
                    })} type="email" placeholder='Enter Your E-Mail ID'
                        className={`mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}`} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input {...register("password", {
                        required: "Password is Reqired",
                        pattern: { value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{6,}$/, message: "At least 6 chars, 1 uppercase, 1 number, 1 special character" }
                    })} type="password" placeholder='Enter Your Password'
                        className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className="mt-4 flex flex-col items-center gap-2">
                    <button disabled={isSubmitting} type="submit" className="w-full bg-black text-white font-bold py-2 rounded-xl hover:bg-gray-900 transition-all">
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                    <NavLink to="/login" className="font-medium text-gray-700 hover:text-black hover:font-bold transition-all"> Already a user? Login
                    </NavLink>
                </div>
            </form>
        </div>
    );

}

export default Signup
