import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    barcode: '',
    description: '',
    price: '',
    quantity: '',
    category: '', // Optional: Add category if needed
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!product.barcode || !product.description || !product.price || !product.quantity) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before API call

    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', { // Ensure the correct API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding product'); // Customize this based on your API response
      }

      alert('Product added successfully!');
      setProduct({ barcode: '', description: '', price: '', quantity: '', category: '' }); // Reset form
      navigate('/products');
    } catch (error) {
      setError(error.message); // Set error message to display
      alert(error.message); // Show alert with the error message
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  return (
    <Container>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
        
        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            value={product.barcode}
            onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          />
        </Form.Group>

        {/* Optional field for product category */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
