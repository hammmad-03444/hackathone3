'use client'
import React from 'react'



import { X } from 'lucide-react';
  

const TopHeader = () => {

  return (
    <div>
        
        <div className="bg-black  text-white  flex lg:justify-between justify-between items-center py-2 max-w-full md:text-sm text-xs">
      {/* Promotional Message */}
      <div className='mx-auto md:max-w-7xl '>
        <span className="sm:mr-2 sm:text-base text-xs">Singup and get 20% off to your first order</span>
        <a
          href="/shop"
          className="text-purple-500 underline hover:text-purple-300 transition"
        >
          Singup
        </a>
      </div>

      {/* Language Dropdown */}
      <div className="relative gap-1 hidden sm:text-base sm:gap-2 md:mr-6">
      <X/>
        </div>
        </div>
        </div>
    
  )
}

export default TopHeader

















