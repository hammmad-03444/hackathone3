'use client'
import { cn } from "@/lib/utils";
import { integralCF } from "@/app/fonts";
import React from "react";
import { PaymentBadge } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import NewsLetterSection from "./NewsLetterSec";


const socialsData = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const footerLinksData = [
    {
      id: 1,
      title: "company",
      children: [
        {
          id: 11,
          label: "about",
          url: "#",
        },
        {
          id: 12,
          label: "features",
          url: "#",
        },
        {
          id: 13,
          label: "works",
          url: "#",
        },
        {
          id: 14,
          label: "career",
          url: "#",
        },
      ],
    },
    {
      id: 2,
      title: "help",
      children: [
        {
          id: 21,
          label: "customer support",
          url: "#",
        },
        {
          id: 22,
          label: "delivery details",
          url: "#",
        },
        {
          id: 23,
          label: "terms & conditions",
          url: "#",
        },
        {
          id: 24,
          label: "privacy policy",
          url: "#",
        },
      ],
    },
    {
      id: 3,
      title: "faq",
      children: [
        {
          id: 31,
          label: "account",
          url: "#",
        },
        {
          id: 32,
          label: "manage deliveries",
          url: "#",
        },
        {
          id: 33,
          label: "orders",
          url: "#",
        },
        {
          id: 34,
          label: "payments",
          url: "#",
        },
      ],
    },
    {
      id: 4,
      title: "resources",
      children: [
        {
          id: 41,
          label: "Free eBooks",
          url: "#",
        },
        {
          id: 42,
          label: "development tutorial",
          url: "#",
        },
        {
          id: 43,
          label: "How to - Blog",
          url: "#",
        },
        {
          id: 44,
          label: "youtube playlist",
          url: "#",
        },
      ],
    },
  ];
const Footer = () => {
const pathname = usePathname();
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#F0F0F0]"></div>
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <h1
                className={cn([
                  integralCF.className,
                  "text-[28px] lg:text-[32px] mb-6",
                ])}
              >
                SHOP.CO
              </h1>
              <p className="text-black/60 text-sm mb-9">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
  {footerLinksData.map((item) => (
    <div key={item.title} className="flex flex-col mt-5">
      {/* Section Title */}
      <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
        {item.title}
      </h3>
      
      {/* Section Links */}
      <div className="flex flex-col">
        {item.children.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className={cn([
              link.id !== 41 && link.id !== 43 && "capitalize",
              "text-black/60 text-sm md:text-base mb-4 w-fit",
            ])}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  ))}
</div>

            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              {footerLinksData.map((item) => (
    <div key={item.title} className="flex flex-col mt-5">
      {/* Section Title */}
      <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
        {item.title}
      </h3>
      
      {/* Section Links */}
      <div className="flex flex-col">
        {item.children.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className={cn([
              link.id !== 41 && link.id !== 43 && "capitalize",
              "text-black/60 text-sm md:text-base mb-4 w-fit",
            ])}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  ))}
            </div>
          </nav>

          <hr className="h-[1px] border-t-black/10 mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
            <p className="text-sm text-center sm:text-left text-black/60 mb-4 sm:mb-0 sm:mr-1">
              Shop.co © 1995-2024 | All Right Reserve
              <Link
                href=""
                className="text-black font-medium"
              >
                
              </Link>
              {", "}
               
            </p>
            <div className="flex items-center">
              {paymentBadgesData.map((badge, _, arr) => (
                <span
                  key={badge.id}
                  className={cn([
                    arr.length !== badge.id && "mr-3",
                    "w-[46px] h-[30px] rounded-[5px] border-[#D6DCE5] bg-white flex items-center justify-center",
                  ])}
                >
                  <Image
                    priority
                    src={badge.srcUrl}
                    width={33}
                    height={100}
                    alt="user"
                    className="max-h-[15px]"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        {!pathname.includes("product") && <div className="mb-20 md:mb-0" />}
      </div>
    </footer>
  );
};

export default Footer;
