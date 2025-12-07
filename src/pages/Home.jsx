import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/");

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative rounded-[2rem] p-12 mb-16 text-center text-white shadow-2xl overflow-hidden h-[500px] flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero_cover.png')" }}
        ></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-lg">
            Discover Your Glow
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto text-gray-100 drop-shadow-md">
            Premium cosmetics designed to bring out your inner radiance.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 border-2 border-white/20 backdrop-blur-md"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8 border-l-8 border-primary pl-6">
        Browse by Category
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute top-0 right-0 bg-primary/10 w-24 h-24 rounded-bl-full -mr-0 -mt-0 transition group-hover:bg-primary/20"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {cat.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {cat.description || "Explore our products in this category."}
              </p>
              <Link
                to={`/products?category=${cat.id}`}
                className="text-primary font-semibold group-hover:underline flex items-center"
              >
                View Products <span className="ml-2 text-xl">→</span>
              </Link>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-10">
              No categories found. Admin needs to add some!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
