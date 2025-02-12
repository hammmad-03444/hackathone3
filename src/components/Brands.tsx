import React from 'react'
import Image from 'next/image'
const brands=[
    {
        id:"gucci",
        src:"/all/icons/gucci-logo.svg",
    },
    {
        id:"prada",
        src:"/all/icons/prada-logo.svg",
    },
    {
        id:"zara",
        src:"/all/icons/zara-logo.svg",
    },
    {
        id:"versace",
        src:"/all/icons/versace-logo.svg",
    },
    {
        id:"calvin-klein",
        src:"/all/icons/calvin-klein-logo.svg",
    },
    
]


const Brands = () => {
  return (
    <div className='bg-black'>
<div className='flex flex-wrap justify-center items-center  mx-atuo max-w-frame md:justify-around py-5 md:py-0 sm:px-4 xl:px-0 space-x-7' >
{brands.map((brand)=>(
    <div key={brand.id}>
        <Image 
        src={brand.src} 
        alt={brand.id} 
        key={brand.id}
        priority
        height={0}
        width={0}
        className='w-auto h-auto max-w-[116px] lg:max-w-48 max-h-[26px] lg:max-h-9 my-5 md:my-11'
        />
    </div>
))}
</div>



    </div>
  )
}

export default Brands