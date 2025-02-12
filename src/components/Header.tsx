"use client"
import Link from "next/link";

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

import { SheetSide } from "./Humburgur";
import { NavigationMenuDemo } from "./navigationMenu";
import { useSelector } from "react-redux";
import ProductSearch from "./search";

export default function Header() {
  const cart =  useSelector((state:any)=>state.cart)

  return (
    <>
     <nav className='w-full border-b-2 border-gray-300 '>
    {/* <div className="fixed z-10 top-0 w-full"> */}
    {/* <AnnouncementBar/> */}
     <header className="w-full  border-b bg-white h-[60px] md:h-[90px] flex justify-between  pr-2 items-center max-w-screen-2xl mx-auto">
           <div className="flex justify-center items-center">
           <SheetSide />
            {/* logo */}
            <h1 className="text-2xl md:text-4xl font-extrabold pl-2">SHOP.CO</h1>
           </div>
            {/* navigation bar */}
            <ul className="hidden md:block ">
                <li className="flex space-x-4 ml-4 mt-2 items-center ">
                    
                
                    <Link href={``}><NavigationMenuDemo/></Link>
                    <Link href={`/sell`}>On Sale</Link>
                    <Link href={"/product"}>New Arrivals</Link>
                    <Link href={"/brands"}>Brands</Link>
                </li>
            </ul>
            {/* right */}
            {/* <Search/> */}
              <ProductSearch />

            <div className="flex space-x-2 sm:space-x-4 items-center">
            {/* <IoIosSearch className="text-4xl  lg:hidden" /> */}
            <Link href={"/cart"} className="relative">
            <IoCartOutline className="md:text-4xl text-3xl "/>
            {cart.length > 0 && (
                <span className="absolute top-[-5px] bg-red-400  rounded-full text-white md:w-[20px] md:h-[20px] w-[15px] h-[15px]  flex justify-center items-center p-1 md:text-sm text-xs right-0">{cart.length}</span>
             )

             }            </Link>
            <MdOutlineAccountCircle className="md:text-4xl text-3xl"/>
            </div>
         
         {/* </div> */}
     </header>
     {/* </div> */}
     </nav>
     </>
  );
}
