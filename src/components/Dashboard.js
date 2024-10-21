import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    //Container for the dashboard, using a fluid layout for responsiveness
    <Container fluid className="mt-4" style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px' }}>
      {/* Dashboard title */}
      <h2 className="text-center mb-4" style={{ color: '#4b4b4b' }}>Dashboard</h2>
      
      {/*Row to hold the dashboard cards*/}
      <Row className="justify-content-center">
        
        {/*Card for navigating to the Add Product page*/}
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm" style={{ backgroundColor: '#f9f6f2' }}>
            <Card.Body>
              <Card.Title className="card-title">Add Product</Card.Title>
              <Card.Text className="card-text">Quickly add new products to inventory</Card.Text>
              <Button as={Link} to="/add-product" variant="success" className="btn-add-product">Go to Add Product</Button>
            </Card.Body>
          </Card>
        </Col>

        {/*Card for navigating to the Product List page*/}
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm" style={{ backgroundColor: '#f9f6f2' }}>
            <Card.Body>
              <Card.Title className="card-title">View Products</Card.Title>
              <Card.Text className="card-text">Manage and review product list</Card.Text>
              <Button as={Link} to="/products" variant="secondary" className="btn-view-products">Go to Product List</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
