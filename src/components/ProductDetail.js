import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error messages

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`); // Adjust the API endpoint if necessary

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const productData = await response.json(); // Get the product data
        setProduct(productData); // Set the product data to state
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Reset loading state
      }
    };
    
    fetchProduct();
  }, [id]);

  // Function to handle product deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // After deleting, navigate back to the product list
        navigate('/product-list');
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(error.message); // Alert the user if delete fails
      }
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>; // Display error message if there's an error
  }

  return (
    <Container>
      <h2>Product Detail</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Category:</strong> {product.category}</p>

      {/* Delete Button */}
      <Button variant="danger" onClick={handleDelete}>
        Delete Product
      </Button>
    </Container>
  );
}

export default ProductDetail;
