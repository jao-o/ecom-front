import React, { useState, useEffect } from 'react';
import { Table, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await fetch('http://127.0.0.1:8000/api/products');

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const productData = await response.json();
      console.log('API Response:', productData); // Log the API response

      // Check for valid data format
      if (Array.isArray(productData)) {
        setProducts(productData);
      } else if (productData.data && Array.isArray(productData.data)) {
        setProducts(productData.data);
      } else {
        console.log('Expected an array but got:', typeof productData, productData);
        throw new Error('Invalid product data format');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch

    // Set up interval for fetching products every 5 seconds (5000 ms)
    const intervalId = setInterval(() => {
      fetchProducts();
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Filter products based on the search term and category filter
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(search.toLowerCase()) && // Search by description
    (categoryFilter === '' || product.category === categoryFilter) // Category filter
  );

  return (
    <Container style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h2 style={{ color: '#4b4b4b' }}>Product List</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Search input field to filter products by description */}
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      />

      {/* Category filter dropdown */}
      <Form.Select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mb-3"
        style={{ borderColor: '#c5c1b4', borderRadius: '8px' }}
      >
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </Form.Select>

      {/* Table to display the list of products */}
      <Table striped bordered hover className="table" style={{ backgroundColor: '#fffdf5' }}>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => {
            // Ensure the price is a number
            const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
            return (
              <tr key={product.id}>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>${price ? price.toFixed(2) : 'N/A'}</td> {/* Handle potential undefined price */}
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/product-detail/${product.id}`} style={{ color: '#6a8759' }}>View Details</Link>
                  <span style={{ marginLeft: '15px' }}></span>
                  <Link to={`/edit-product/${product.id}`} style={{ color: '#6a8759' }}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
