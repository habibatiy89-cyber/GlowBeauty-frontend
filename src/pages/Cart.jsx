import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        try {
            // Hardcoded User ID 1 for MVP (since no Auth)
            const orderData = {
                user_id: 1, 
                items: cart.map(item => ({ product_id: item.id, quantity: item.quantity }))
            };
            await api.post('/orders/', orderData);
            alert("Order placed successfully!");
            clearCart();
        } catch (error) {
            console.error("Failed to place order", error);
            alert("Failed to place order.");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any glow yet.</p>
                <Link to="/products" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow hover:bg-pink-600 transition">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between border border-gray-100">
                             <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                                     {item.image_url ? <img src={item.image_url} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No Img</div>}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                             </div>
                             <div className="flex items-center space-x-6">
                                <div className="flex items-center bg-gray-100 rounded-lg">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:text-primary transition"><FaMinus size={12}/></button>
                                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-primary transition"><FaPlus size={12}/></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition"><FaTrash /></button>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-500 font-semibold">Free</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pink-600 transition-all transform hover:-translate-y-1">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;
