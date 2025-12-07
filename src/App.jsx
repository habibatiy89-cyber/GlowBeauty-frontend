import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
        <Router>
        <div className="min-h-screen bg-gray-50 pt-20 font-sans text-gray-900">
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
        </Router>
    </CartProvider>
  );
}

export default App;
