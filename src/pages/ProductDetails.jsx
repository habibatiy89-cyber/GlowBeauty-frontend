import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (!product) return <div className="text-center p-20 text-xl font-bold">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
        <div className="h-96 md:h-auto bg-gray-50 flex items-center justify-center p-8">
            {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain rounded-lg shadow-sm" />
            ) : (
                <div className="text-gray-300 text-6xl font-light">No Image</div>
            )}
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center justify-between mb-8">
                 <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                 <div className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">In Stock</div>
            </div>

            <button onClick={() => addToCart(product)} className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-pink-600 transition-all transform hover:-translate-y-1 flex items-center justify-center text-lg">
                <FaShoppingCart className="mr-3" /> Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
