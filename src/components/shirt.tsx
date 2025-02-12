

"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "./ProductCard";

interface Iproducts {
  image: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
}

interface ShirtProps {
  maxPrice: number;
}
// Function to generate star ratings dynamically
const renderStars = (count: number) => {
  return Array.from({ length: count }, (_, index) => (
    <FaStar key={index} className="text-yellow-400" />
  ));
};

export default function Shirt({maxPrice}:ShirtProps) {
  const [products, setProducts] = useState<Iproducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Iproducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Iproducts[] = await client.fetch(
          `*[_type == 'products']{
            "image": image.asset->url,
            category,
            discountPercent,
            isNew,
            name,
            description,
            price,
            _id
          }`
        );
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter(product => product.price <= maxPrice));
  }, [maxPrice, products]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold">Loading products...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-[25px] font-bold relative pl-5">
        Casual
        <span className="text-sm font-bold flex items-center justify-center absolute right-10 top-2">
          Most Popular <RiArrowDropDownLine />
        </span>
      </h1>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 md:p-0 place-items-center  ">
        {filteredProducts.map((product) => (
          
            <Link href={`/product/${product._id}`}  key={product._id}>
            <ProductCard
            key={product._id}
            image={urlFor(product.image).url()}
            name={product.name}
            price={product.price}
            discountPercent={product.discountPercent}
          />
            </Link>
          
        ))}
      </div>
    </div>
  );
}
