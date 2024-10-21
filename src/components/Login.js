import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  // State to hold login credentials
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // State for error messages
  
  // Navigation hook to redirect the user on successful login
  const navigate = useNavigate();

  // Handle function for login action
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state
    setError(null); // Reset error state

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', { // Adjust the API endpoint if necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Send credentials as JSON (email and password)
      });

      if (!response.ok) {
        throw new Error('Invalid email or password'); // Handle error response
      }

      const data = await response.json(); // Get the response data

      // Assuming the API returns a token or some user data
      // Store token or user information in local storage or context
      localStorage.setItem('token', data.token); // Example of storing token
      navigate('/dashboard'); // Redirect to the dashboard upon successful login
    } catch (error) {
      setError(error.message); // Set error message if login fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    // Container for centering the login form vertically and horizontally
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          {/* Login form title */}
          <h2 className="text-center mb-4" style={{ color: '#4b4b4b' }}>Login</h2>

          {/* Show error message if any */}
          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleLogin}>
            {/* Email field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </Form.Group>

            {/* Password field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </Form.Group>

            {/* Login button */}
            <Button className="w-100" variant="primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
