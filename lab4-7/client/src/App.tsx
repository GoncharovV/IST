import React from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProductsPage from './pages/Products/ProductsPage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import UsersPage from './pages/Users/UsersPage';

function App() {
    const location = useHistory();

    return (
        <>
            <Row className='gy-4'>
                <Navbar bg="light" variant="light" expand="lg">
                    <Container>
                        <Navbar.Brand>IST</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => location.push('/products')}>Товары</Nav.Link>
                            <Nav.Link onClick={() => location.push('/categories')}>Категории</Nav.Link>
                            <Nav.Link onClick={() => location.push('/users')}>Пользователи</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar></Row>

            <Row className='gy-0'>
                <Container>
                    <Switch>
                        <Route path="/products"><ProductsPage/></Route>
                        <Route path="/categories"><CategoriesPage/></Route>
                        <Route path="/users"><UsersPage/></Route>
                        <Redirect to="/products"/>
                    </Switch>
                </Container>
            </Row>

        </>
    );
}

export default App;
