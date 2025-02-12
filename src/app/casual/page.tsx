'use client'
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";
import Top_sell from "../product/sell";
import { AccordionDemo } from "@/components/accordin";
import { SliderDemo } from "@/components/slider";
import { CheckboxDemo } from "@/components/checkbox";

import Shirt from "@/components/shirt";
import Paginationpage from "@/components/pagination";
import { useState } from "react";
export default function Category(){
    const [maxPrice,setMaxPrice]=useState(500)

    return(
        
        <div className=" max-w-screen-2xl p-5 mx-auto">
            <BreadcrumbCollapsed/>
            {/* start */}
            <div className="flex flex-col items-center md:flex-row justify-center md:items-start md:space-x-4 mt-5">
                {/* left */}
                <div className="w-full h-full md:w-[295px] lg:h-[1220px] rounded-[20px] border">
                   {/* Filters */}
                   <div>
                        <AccordionDemo/>
                        <div className="px-5 border-b pb-3">
                            <h1 className="text-lg font-bold ">Price</h1>
                            {/* <SliderDemo className="cursor-pointer"/>
                            <p className=" space-x-10 ml-3 font-bold mt-1"><span>$50</span> <span>$100</span> <span>$500</span></p> */}
                            <SliderDemo 
                                className="cursor-pointer"
                                defaultValue={[maxPrice]}
                                max={500}
                                step={10}
                                onValueChange={(value) => setMaxPrice(value[0])} // Update price state
                            />
                            <p className="space-x-10 ml-3 font-bold mt-1">
                                <span>$0</span> <span>${maxPrice}</span> <span>$500</span>
                            </p>
                        </div>
                        <div className="flex flex-col px-5 mt-3 ml-1 border-b pb-3">
                        <h1 className="text-lg font-bold ">Colors</h1>
                        <CheckboxDemo />
                        </div>
                        <div className="flex flex-col px-5 mt-3 ml-1 border-b pb-3">
                        <h1 className="text-lg font-bold ">Size</h1>
                            <div className="flex flex-wrap mt-2 "> 
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">XX-Small</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">X-Small</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">Small</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">Medium</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">Large</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">X-Large</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">XX-Large</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">3X-Large</div>
                        <div className="w-[80px]  ml-1 mt-1  h-[40px] text-sm hover:bg-black hover:text-white cursor-pointer flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">4X-Large</div>
                            </div>
                        </div>
                        {/* drees */}
                        <div>
                            {/* <DressStyle /> */}
                        </div>
                   </div>
                </div >
                {/* right */}
                <div className="max-w-5xl mt-3 md:mt-0 border-b ">
                     <Shirt maxPrice={maxPrice}/>
                    
                </div>
                {/* right complete */}
               
            </div>
            <Paginationpage/>
        </div>
    )
}