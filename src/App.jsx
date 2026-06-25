import React, {  } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import './assets/css/tailwind.css';
// import './assets/css/icons.css';

import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";

import Index from "./pages/index";
import Grid from "./pages/listing/grid-view/grid";
import ProductDetail from "./pages/products/ProductDetail";

import Aboutus from "./pages/inner-pages/aboutus";
import Features from "./pages/inner-pages/features";
import Faq from "./pages/inner-pages/faq";
import Contact from "./pages/inner-pages/contact";
import Terms from "./pages/inner-pages/terms";
import Privacy from "./pages/inner-pages/privacy";

import Comingsoon from "./pages/special/comingsoon";
import Maintenance from "./pages/special/maintenance";
import Page404 from "./pages/special/404";

import ScrollToTop from "./component/scroll-to-top";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";
import { CartProvider } from "./context/CartContext.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
            <CartProvider>
            <ScrollToTop />
            <Routes >
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/index-two" element={<Navigate to="/" replace />} />
              <Route path="/index-three" element={<Navigate to="/" replace />} />
              <Route path="/index-four" element={<Navigate to="/" replace />} />
              <Route path="/index-five" element={<Navigate to="/" replace />} />
              <Route path="/index-six" element={<Navigate to="/" replace />} />
              <Route path="/index-seven" element={<Navigate to="/" replace />} />
              <Route path="/index-eight" element={<Navigate to="/" replace />} />
              <Route path="/index-nine" element={<Navigate to="/" replace />} />
              <Route path="/index-ten" element={<Navigate to="/" replace />} />
              <Route path="/index-eleven" element={<Navigate to="/" replace />} />
              <Route path="/index-twelve" element={<Navigate to="/" replace />} />
              <Route path="/index-thirteen" element={<Navigate to="/" replace />} />
              <Route path="/index-fourteen" element={<Navigate to="/" replace />} />
              
              <Route path="/buy" element={<Navigate to="/products" replace />} />
              <Route path="/sell" element={<Navigate to="/products" replace />} />

              <Route path="/grid" element={<Grid/>} />
              <Route path="/products" element={<Grid />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/grid-sidebar" element={<Navigate to="/products" replace />} />
              <Route path="/grid-map" element={<Navigate to="/products" replace />} />
      
              <Route path="/list" element={<Navigate to="/products" replace />} />
              <Route path="/list-sidebar" element={<Navigate to="/products" replace />} />
              <Route path="/list-map" element={<Navigate to="/products" replace />} />

              <Route path="/property-detail/:id" element={<Navigate to="/products" replace />} />
              <Route path="/property-detail-two" element={<Navigate to="/products" replace />} />

              <Route path="/aboutus" element={<Aboutus/>} />
              <Route path="/features" element={<Features/>} />
              <Route path="/pricing" element={<Navigate to="/products" replace />} />
              <Route path="/faqs" element={<Faq/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

      
              <Route path="/blogs" element={<Navigate to="/products" replace />} />
              <Route path="/blog-detail" element={<Navigate to="/products" replace />} />
              <Route path="/blog-detail/:id" element={<Navigate to="/products" replace />} />
              <Route path="/blog-sidebar" element={<Navigate to="/products" replace />} />
      
              <Route path="/agents" element={<Navigate to="/products" replace />} />
              <Route path="/agent-profile" element={<Navigate to="/products" replace />} />
              <Route path="/agent-profile/:id" element={<Navigate to="/products" replace />} />
      
              <Route path="/agencies" element={<Navigate to="/products" replace />} />
              <Route path="/agency-profile" element={<Navigate to="/products" replace />} />
              <Route path="/agency-profile/:id" element={<Navigate to="/products" replace />} />

              <Route path="/auth-login" element={<Login />} />
              <Route path="/auth-signup" element={<Signup />} />
              <Route path="/auth-reset-password" element={<ResetPassword />} />

              <Route path="/comingsoon" element={<Comingsoon/>} />
              <Route path="/maintenance" element={<Maintenance/>} />
              <Route path="/404" element={<Page404/>} />
      
            </Routes>
            </CartProvider>
          </BrowserRouter >
    </>
  )
}

export default App
