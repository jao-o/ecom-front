//Handles the routing between different components/pages.
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/*Route for the login page*/}
        <Route path="/" element={<Login />} />
        
        {/*Protected routes*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />  {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
