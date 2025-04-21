import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-14 bg-gray-100">
      <div className="w-16 h-16 border-4 mt-3 border-gray-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader
