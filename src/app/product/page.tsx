"use client"
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

// Adding key prop in star array
let star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
];

interface Iproducts {
    image: string;
    discountPercent: number;
    isNew: boolean;
    name: string;
    description: string;
    price: number;
    _id: string;
}

export default function Product() {
    const [products, setProducts] = useState<Iproducts[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await client.fetch(
                    `*[_type == 'products' && category == 'tshirt']{
                        "image": image.asset->url,
                        category,
                        discountPercent,
                        isNew,
                        name,
                        description,
                        price,
                        _id
                    }[0...4]`
                );
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="w-full h-full mt-10 lg:mt-36 max-w-screen-xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
                <div className="relative mt-10 overflow-x-auto overflow-y-visible flex space-x-5 px-8">
                    {products.length > 0 ? (
                        products.map((data) => {
                            return (
                                <div key={data._id} className="flex-shrink-0">
                                    <Link href={`/product/${data._id}`}>
                                        {/* <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]"> */}
                                        <ProductCard
                                        key={data._id}
                                        image={urlFor(data.image).url()}
                                        name={data.name}
                                        price={data.price}
                                        discountPercent={data.discountPercent}
                                         />
                                        {/* </div> */}
                                    </Link>
                                    
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500 w-full">
                            No products available at the moment. Please try again later.
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-start mt-5">
                <Link href="/casual">
                    <Button
                        variant={"outline"}
                        className="sm:mt-0 w-[80%] sm:w-[200px] rounded-[20px]"
                    >
                        View all
                    </Button>
                </Link>
            </div>
        </>
    );
}
