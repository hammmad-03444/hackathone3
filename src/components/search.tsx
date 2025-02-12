
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
}

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // For showing/hiding results
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // Mobile search toggle

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const query = `*[_type == "products" && (
          name match $searchQuery || 
          category match $searchQuery
        )] {
          _id,
          name,
          category,
          "image": image.asset->url
        }`;

        const results = await client.fetch(query, {
          searchQuery: `${searchQuery}*`
        });

        // Filter out duplicate products based on _id
        const uniqueProducts = Array.isArray(results) 
          ? Array.from(new Map(results.map((p) => [p._id, p])).values()) 
          : [];

        setProducts(uniqueProducts);
        setShowResults(true); // Show results when searching
      } catch (error) {
        console.error('Sanity search error:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.search-container')) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative search-container flex items-center">
      {/* Mobile Search Icon */}
      <div className="lg:hidden hidden ">
        {isMobileSearchOpen ? (
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsMobileSearchOpen(false)}
          />
        ) : (
          <Search
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsMobileSearchOpen(true)}
          />
        )}
      </div>

      {/* Search Input (Hidden on Mobile Until Clicked) */}
      <div
        className={`relative transition-all duration-300 ${
          isMobileSearchOpen ? 'block ' : 'hidden lg:flex'
        }`}
      >
        <Search className="absolute md:block  hidden left-2 top-2 space-x-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#F5F5F5] rounded-full px-4 lg:pr-60 pl-10 md:block hidden"
          onFocus={() => setShowResults(true)} // Show results when input is focused
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchQuery && (
        <div className="relative w-3/4 bg-white border rounded-md pt-10 shadow-md mt-5 max-h-60 overflow-y-auto  z-10">
          {loading ? (
            <p className="p-4 text-gray-500">Loading...</p>
          ) : products.length === 0 ? (
            <p className="p-4 text-gray-500">No products found for {searchQuery}</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setShowResults(false)} // Hide results when clicking a product
                >
                  <Link href={`/product/${product._id}`} className="flex items-center w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-12 h-12 rounded-md object-cover mr-3"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}














