import React, {  } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import './assets/css/tailwind.css';
// import './assets/css/icons.css';

import Index from "./pages/index";
import Grid from "./pages/listing/grid-view/grid";
import ProductDetail from "./pages/products/ProductDetail";

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
import CategoriesPage from "./pages/categories/CategoriesPage";
import { CartProvider } from "./context/CartContext.jsx";
import StoreBrandingEffect from "./component/StoreBrandingEffect.jsx";
import MaintenanceGate from "./component/MaintenanceGate.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
            <CartProvider>
            <StoreBrandingEffect />
            <ScrollToTop />
            <MaintenanceGate>
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
              
              <Route path="/buy" element={<Navigate to="/shop" replace />} />
              <Route path="/sell" element={<Navigate to="/shop" replace />} />

              <Route path="/shop" element={<Grid />} />
              <Route path="/grid" element={<Grid/>} />
              <Route path="/products" element={<Grid />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/grid-sidebar" element={<Navigate to="/shop" replace />} />
              <Route path="/grid-map" element={<Navigate to="/shop" replace />} />
      
              <Route path="/list" element={<Navigate to="/shop" replace />} />
              <Route path="/list-sidebar" element={<Navigate to="/shop" replace />} />
              <Route path="/list-map" element={<Navigate to="/shop" replace />} />

              <Route path="/property-detail/:id" element={<Navigate to="/shop" replace />} />
              <Route path="/property-detail-two" element={<Navigate to="/shop" replace />} />

              <Route path="/aboutus" element={<Navigate to="/" replace />} />
              <Route path="/features" element={<Navigate to="/" replace />} />
              <Route path="/pricing" element={<Navigate to="/shop" replace />} />
              <Route path="/faqs" element={<Navigate to="/" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

      
              <Route path="/blogs" element={<Navigate to="/shop" replace />} />
              <Route path="/blog-detail" element={<Navigate to="/shop" replace />} />
              <Route path="/blog-detail/:id" element={<Navigate to="/shop" replace />} />
              <Route path="/blog-sidebar" element={<Navigate to="/shop" replace />} />
      
              <Route path="/agents" element={<Navigate to="/shop" replace />} />
              <Route path="/agent-profile" element={<Navigate to="/shop" replace />} />
              <Route path="/agent-profile/:id" element={<Navigate to="/shop" replace />} />
      
              <Route path="/agencies" element={<Navigate to="/shop" replace />} />
              <Route path="/agency-profile" element={<Navigate to="/shop" replace />} />
              <Route path="/agency-profile/:id" element={<Navigate to="/shop" replace />} />

              <Route path="/auth-login" element={<Navigate to="/shop" replace />} />
              <Route path="/auth-signup" element={<Navigate to="/shop" replace />} />
              <Route path="/auth-reset-password" element={<Navigate to="/shop" replace />} />

              <Route path="/comingsoon" element={<Comingsoon/>} />
              <Route path="/maintenance" element={<Maintenance/>} />
              <Route path="/404" element={<Page404/>} />
      
            </Routes>
            </MaintenanceGate>
            </CartProvider>
          </BrowserRouter >
    </>
  )
}

export default App
