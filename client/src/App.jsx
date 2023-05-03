import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import ProductsProvider from "./context/ProductsContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import AdminProducts from "./pages/AdminProducts";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/adminproducts" element={<AdminProducts />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
