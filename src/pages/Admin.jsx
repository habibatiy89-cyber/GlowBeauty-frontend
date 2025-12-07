import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { FaTrash, FaPlus } from 'react-icons/fa';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image_url: '', category_id: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const cats = await api.get('/categories');
            const prods = await api.get('/products');
            setCategories(cats.data);
            setProducts(prods.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            await api.post('/categories/', newCategory);
            alert("Category created!");
            setNewCategory({ name: '', description: '' });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Failed to create category");
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products/', newProduct);
            alert("Product created!");
            setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' });
            fetchData();
        } catch (error) {
             console.error(error);
             alert("Failed to create product");
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${newProduct.id}`, newProduct);
            alert("Product updated!");
            setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Failed to update product");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            alert("Product deleted!");
            fetchData();
            // Clear form if deleted product was selected
            if (newProduct.id === id) {
                 setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' });
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete product");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
            
            <div className="flex space-x-4 mb-8">
                <button onClick={() => setActiveTab('categories')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'categories' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Categories</button>
                <button onClick={() => setActiveTab('products')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'products' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Products</button>
            </div>

            {activeTab === 'categories' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleCreateCategory} className="space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-3 border rounded-xl" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} required />
                            <textarea placeholder="Description" className="w-full p-3 border rounded-xl" value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} />
                            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">Create Category</button>
                        </form>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Existing Categories</h2>
                        {categories.map(cat => (
                            <div key={cat.id} className="bg-white p-4 rounded-xl shadow border border-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{cat.name}</h3>
                                    <p className="text-sm text-gray-500">{cat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold mb-4">{newProduct.id ? 'Edit Product' : 'Add Product'}</h2>
                        
                        {/* Product Selection Dropdown */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Product to Edit</label>
                            <select 
                                className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                                onChange={(e) => {
                                    const prodId = parseInt(e.target.value);
                                    if (prodId) {
                                        const prod = products.find(p => p.id === prodId);
                                        if (prod) setNewProduct(prod);
                                    } else {
                                        setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' });
                                    }
                                }}
                                value={newProduct.id || ''}
                            >
                                <option value="">-- Create New Product --</option>
                                {products.map(prod => (
                                    <option key={prod.id} value={prod.id}>{prod.name} (${prod.price})</option>
                                ))}
                            </select>
                        </div>
                        
                        <form onSubmit={newProduct.id ? handleUpdateProduct : handleCreateProduct} className="space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-3 border rounded-xl" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                            <textarea placeholder="Description" className="w-full p-3 border rounded-xl" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Price" className="w-full p-3 border rounded-xl" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                                <select className="w-full p-3 border rounded-xl" value={newProduct.category_id} onChange={e => setNewProduct({...newProduct, category_id: e.target.value})} required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl" value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} />
                            
                            <div className="flex gap-2">
                                <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-xl transition ${newProduct.id ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary hover:bg-pink-600'}`}>
                                    {newProduct.id ? 'Update Product' : 'Create Product'}
                                </button>
                                {newProduct.id && (
                                    <button type="button" onClick={() => setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' })} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                        <h2 className="text-xl font-bold">Existing Products</h2>
                        {products.map(prod => (
                            <div key={prod.id} className="bg-white p-4 rounded-xl shadow border border-gray-50 flex justify-between items-center group hover:border-primary/50 transition">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {prod.image_url ? <img src={prod.image_url} className="w-full h-full object-cover"/> : <div className="text-[10px] text-gray-400 text-center pt-4">No Img</div>}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{prod.name}</h3>
                                        <p className="text-sm text-gray-500">${prod.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setNewProduct(prod)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition text-sm font-semibold">Edit</button>
                                    <button onClick={() => handleDeleteProduct(prod.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Admin;
