import React from 'react'
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 px-10 flex justify-between items-center text-gray-600">
      {/* Left Section - Logo & Text */}
      <div className="flex items-center gap-3">
        <span className="bg-gray-900 text-white font-bold px-2 py-1 rounded">Foodly</span>
        <p>© 2025 Company, Inc</p>
      </div>

      {/* Right Section - Social Icons */}
      <div className="flex gap-4 text-gray-500">
        <FaTwitter className="text-xl cursor-pointer hover:text-gray-700" />
        <FaInstagram className="text-xl cursor-pointer hover:text-gray-700" />
        <FaFacebook className="text-xl cursor-pointer hover:text-gray-700" />
      </div> 
    </footer>
  )
}

export default Footer
