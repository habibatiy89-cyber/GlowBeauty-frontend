import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { useSearchParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                let data = response.data;
                if (categoryId) {
                    data = data.filter(p => p.category_id === parseInt(categoryId));
                }
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-l-8 border-primary pl-6">
                {categoryId ? 'Category Products' : 'All Products'}
            </h2>
             {loading ? (
                <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-56 bg-gray-50 relative overflow-hidden flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                ) : (
                                    <div className="text-gray-300 text-4xl font-light">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                     <Link to={`/products/${product.id}`} className="p-3 bg-white rounded-full text-gray-800 hover:text-primary hover:scale-110 transition">
                                        <FaEye />
                                     </Link>
                                     <button onClick={() => addToCart(product)} className="p-3 bg-white rounded-full text-gray-800 hover:text-primary hover:scale-110 transition">
                                        <FaShoppingCart />
                                     </button>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <Link to={`/products/${product.id}`}>
                                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">{product.name}</h3>
                                </Link>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                                <div className="flex justify-between items-end mt-auto">
                                    <span className="font-extrabold text-2xl text-gray-900">${product.price.toFixed(2)}</span>
                                    <button onClick={() => addToCart(product)} className="text-sm font-semibold text-primary hover:underline">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                     {products.length === 0 && <p className="text-gray-500 col-span-full text-center py-10 text-lg">No products found. Please ask admin to stock up!</p>}
                </div>
            )}
        </div>
    );
};
export default Products;
