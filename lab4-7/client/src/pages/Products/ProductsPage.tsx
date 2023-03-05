import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import ProductModal from './ProductModal';
import axios from 'axios';
import { API_SOURCE } from '../../index';

export const repeat = (v: unknown, count: number) => new Array(count).fill(v)

const ProductsPage = () => {
    const [products, setProducts] = useState<any>([])

    const [modal, setModal] = useState(false)


    const [currentEdit, setCurrentEdit] = useState<any>(null)

    const loadProducts = async () => {
        const products = await axios.get('http://localhost:5000/products');

        setProducts(products.data)
    }

    useEffect(() => {
        loadProducts();
    }, [])

    const hideModal = () => {
        setModal(false)
        setCurrentEdit(null)

        setTimeout(() => loadProducts(), 100)
    }

    const openEditModal = (p: any) => {
        setCurrentEdit(p)
        setModal(true)
    }

    const openModal = () => {
        setModal(true)
        setCurrentEdit(null)
    }

    const deleteProduct = async (id: number) => {
        const confirmed = window.confirm('Удалить?');

        if (confirmed) {
            await axios.delete(API_SOURCE + '/products/'+id);
            loadProducts()
        }

    }

    return (
        <Container>
            <h1>Товары</h1>

            <Alert variant='success'>
                <Button variant="primary" onClick={openModal}>Добавить новый товар</Button>
                <ProductModal show={modal} onHide={hideModal} edit={!!currentEdit} product={currentEdit}/>
            </Alert>

            <Row xs={1} md={4} className="g-4">
                {
                    products.map((product) => (
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={ product.image } />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        {product.description} <br />

                                        Категория: <Badge bg='success'>{product.category.name}</Badge><br />
                                        Владелец: <Badge bg='info'>{product.creator.email}</Badge>

                                    </Card.Text>

                                    <Row>
                                        <Col>
                                            <Button variant="outline-danger" onClick={() => deleteProduct(product.id)}>Удалить</Button>
                                        </Col>

                                        <Col>
                                            <Button variant="outline-secondary" onClick={() => openEditModal(product)}>Редактировать</Button>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>


    );
};

export default ProductsPage;
