import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, CardGroup, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import ProductModal from './ProductModal';
import axios from 'axios';
import { API_SOURCE } from '../../index';

export const repeat = (v: unknown, count: number) => new Array(count).fill(v)

const ProductsPage = () => {
    const [products, setProducts] = useState<any>([])

    const [modal, setModal] = useState(false)

    const [minPrice, setMinPrice] = useState<any>(0)
    const [maxPrice, setMaxPrice] = useState<any>(15_000_000)
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(-1)

    const [categories, setCategories] = useState<any>([])

    const getCategories = async () => {
        const categories = await axios.get(API_SOURCE + '/categories');

        setCategories(categories.data);
    };


    const [currentEdit, setCurrentEdit] = useState<any>(null)

    const loadProducts = async () => {
        const products = await axios.get(API_SOURCE + '/products', {
            params: {
                minPrice,
                maxPrice,
                categoryId: selectedCategoryId >= 0 ? selectedCategoryId : undefined,
            }
        });

        setProducts(products.data)
    }

    useEffect(() => {
        loadProducts();
    }, [maxPrice, minPrice, selectedCategoryId])

    useEffect(() => {
        getCategories();
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
            await axios.delete(API_SOURCE + '/products/' + id);
            loadProducts()
        }

    }

    return (
        <Container>
            <h1>Товары</h1>

            <Alert variant="success">

                <ProductModal show={modal} onHide={hideModal} edit={!!currentEdit} product={currentEdit}/>

                <InputGroup className="mb-3">
                    <Button variant="primary" onClick={openModal}>Добавить новый товар</Button>
                    <InputGroup.Text>Минимальная цена</InputGroup.Text>
                    <Form.Control type="number" placeholder="Минимальная цена" name="minPrice"
                                  onChange={e => setMaxPrice(e.target.value)} value={minPrice}/>
                    <InputGroup.Text>Максимальная цена</InputGroup.Text>
                    <Form.Control type="number" placeholder="Максимальная цена" name="maxPrice"
                                  onChange={e => setMaxPrice(e.target.value)} value={maxPrice}/>

                    <InputGroup.Text>Категория</InputGroup.Text>
                    <Form.Select aria-label="Default select example" name='categoryId' onChange={e => setSelectedCategoryId(e.target.value)} value={selectedCategoryId}>
                        <option value={-1}>Все</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </Form.Select>
                </InputGroup>
            </Alert>

            <Row xs={1} md={4} className="g-4">
                {
                    products.map((product) => (
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={product.image}/>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        {product.description} <br/>

                                        Категория: <Badge bg="success">{product.category.name}</Badge><br/>
                                        Владелец: <Badge bg="info">{product.creator.name}</Badge><br/>
                                        Цена: <Badge bg="danger">{product.price}</Badge>

                                    </Card.Text>

                                    <Row>
                                        <Col>
                                            <Button variant="outline-danger"
                                                    onClick={() => deleteProduct(product.id)}>Удалить</Button>
                                        </Col>

                                        <Col>
                                            <Button variant="outline-secondary"
                                                    onClick={() => openEditModal(product)}>Редактировать</Button>
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
