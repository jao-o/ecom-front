import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // State to store the product details
  const [product, setProduct] = useState({
    barcode: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  });
  
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // State for error messages

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`); // Fetch product details
        if (!response.ok) {
          throw new Error('Error fetching product details');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated product data
    const updatedProduct = {
      ...product,
      price: parseFloat(product.price), // Ensure price is a number
      quantity: parseInt(product.quantity) // Ensure quantity is a number
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, { // Update product API URL
        method: 'PUT', // Use PUT method to update
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      alert('Product updated successfully!'); // Optional success message
      navigate('/product-list'); // Redirect to product list page
    } catch (error) {
      alert(error.message); // Show alert with the error message
    }
  };

  return (
    <Container>
      <h2>Edit Product</h2>
      {loading ? (
        <p>Loading...</p> // Show loading message while fetching
      ) : (
        <Form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
          
          {/* Barcode */}
          <Form.Group controlId="formProductBarcode">
            <Form.Label>Barcode</Form.Label>
            <Form.Control
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              readOnly // Make barcode read-only if it shouldn't be changed
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Price */}
          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              step="0.01"
            />
          </Form.Group>

          {/* Quantity */}
          <Form.Group controlId="formProductQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default EditProduct;
