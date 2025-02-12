import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils";
import { integralCF } from "@/app/fonts";
import Image from "next/image";
import React from "react";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px]">
      <p
        className={cn([
          integralCF.className,
          "font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0",
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex items-center">
        <div className="flex flex-col max-w-[349px] mx-auto gap-2">
        <div className="relative">
            <Input
            placeholder="Enter your email address"
            className=" text-sm sm:text-base font-medium bg-white h-12 rounded-full py-3 mr-32 pl-10"
            />
            <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className=" absolute min-w-5 min-h-5 top-3 left-4 "
              />
        </div>
        
          
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3"
            aria-label="Subscribe to Newsletter"
            type="button"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;