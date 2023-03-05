import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { API_SOURCE } from '../../index';
import CategoriesModal from './CategoriesModal';

const CategoriesPage = () => {
    const [categories, setCategories] = useState<any>([]);

    const getCategories = async () => {
        const categories = await axios.get(API_SOURCE + '/categories');

        setCategories(categories.data);
    };
    useEffect(() => {

        getCategories();

    }, []);

    const [currentEdit, setCurrentEdit] = useState<any>(null)
    const [modal, setModal] = useState<any>(false)


    const hideModal = () => {
        setModal(false)
        setCurrentEdit(null)

        getCategories()
    }

    const openEditModal = (p: any) => {
        setCurrentEdit(p)
        setModal(true)
    }

    const deleteCategory = async (id: number) => {
        await axios.delete(API_SOURCE + '/categories/' + id)

        await getCategories()
    }

    return (
        <Container>
            <h1>Категории</h1>

            <Row className='g-4'>
                <Alert variant='secondary'>
                    <Button onClick={() => setModal(true)}>Создать категорию</Button>
                    <CategoriesModal show={modal} category={currentEdit} onHide={hideModal}/>
                </Alert>
            </Row>


            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index}</td>
                            <td>{category.name}</td>
                            <td><Button variant='warning' onClick={() => openEditModal(category)}>Изменить</Button></td>
                            <td><Button variant='danger' onClick={() => deleteCategory(category.id)}>Удалить</Button></td>
                        </tr>
                    ))
                }

                </tbody>
            </Table>

        </Container>
    );
};

export default CategoriesPage;
