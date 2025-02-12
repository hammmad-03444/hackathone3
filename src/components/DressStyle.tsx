import React from 'react'
import SectionHeader from './SectionHeader'
import { cn } from '@/lib/utils'

import Link from 'next/link'

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
        <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <div className="text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize">
        <SectionHeader heading='BROWSE BY DRESS STYLE'/>
        </div>
        <div className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5 justify-center">
        <Link href={'/'} className={cn([
        "w-full md:h-full rounded-[20px] bg-white bg-top text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover",
        "md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-1.png')]",
      ])}>
      Casual
    </Link>
        <Link 
        href={'/'} className={cn([
        "w-full md:h-full rounded-[20px] bg-white bg-top text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover",
        "md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-2.png')]",
      ])}>
      Formal
    </Link>
    </div>
    <div className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5 justify-center">
       <Link
       href={'/'}
       className={cn([
        "w-full md:h-full rounded-[20px] bg-white bg-top text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover",
        "md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-3.png')]",
      ])}>
        
      Party
    
    
    </Link>
    <Link href={'/'} className={cn([
        "w-full md:h-full rounded-[20px] bg-white bg-top text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover",
        "md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-4.png')]",
      ])}>
      Gym
    </Link>
    </div>
        </section>
    </div>
  )
}

export default DressStyle