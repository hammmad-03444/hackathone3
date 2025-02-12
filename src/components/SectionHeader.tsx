import { integralCF } from '@/app/fonts'
import { cn } from '@/lib/utils'
import React from 'react'

const SectionHeader = ({heading}:{heading:string}) => {
  return (
    <div>
<h1 className={cn([
              integralCF.className,
              " lg:text-[48px] lg:leading-[48px] text-3xl mt-2 ",
            ])}>{heading} </h1>

    </div>
  )
}

export default SectionHeader