import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { API_SOURCE } from '../../index';
import UsersModal from './UsersModal';

const UsersPage = () => {
    const [users, setUsers] = useState<any>([]);

    const getUsers = async () => {
        const users = await axios.get(API_SOURCE + '/users');

        setUsers(users.data);
    };
    useEffect(() => {

        getUsers();

    }, []);

    const [currentEdit, setCurrentEdit] = useState<any>(null)
    const [modal, setModal] = useState<any>(false)


    const hideModal = () => {
        setModal(false)
        setCurrentEdit(null)

        getUsers()
    }

    const openEditModal = (p: any) => {
        setCurrentEdit(p)
        setModal(true)
    }

    const deleteCategory = async (id: number) => {
        const confirmed = window.confirm('Удалить?');

        if (confirmed) {
            await axios.delete(API_SOURCE + '/users/'+id);
            getUsers()
        }
    }

    const openModal = () => {
        setModal(true)
        setCurrentEdit(null)
    }

    return (
        <Container>
            <h1>Пользователи</h1>

            <Row className='g-4'>
                <Alert variant='success'>
                    <Button onClick={openModal}>Добавить пользователя</Button>
                    <UsersModal show={modal} category={currentEdit} onHide={hideModal}/>
                </Alert>
            </Row>


            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Button variant='warning' onClick={() => openEditModal(user)}>Изменить</Button></td>
                            <td><Button variant='danger' onClick={() => deleteCategory(user.id)}>Удалить</Button></td>
                        </tr>
                    ))
                }

                </tbody>
            </Table>

        </Container>
    );
};

export default UsersPage;
