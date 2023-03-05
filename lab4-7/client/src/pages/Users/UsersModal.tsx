import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { API_SOURCE } from '../../index';

const defaultValue = {
    email: '',
    password: '',
    name: '',
}


const UsersModal: React.FC<any> = ({show, onHide, user}) => {
    const edit = !!user;

    const [formValue, setFormValue] = useState(defaultValue)

    useEffect(() => {
        edit && setFormValue(user)
        !edit && setFormValue(defaultValue)
    }, [user])

    const handleChange = (event) => {
        setFormValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const create = () => {
        axios.post(API_SOURCE + '/users', formValue)
    }

    const update = () => {
        axios.put(API_SOURCE + '/users', formValue)
    }

    const submit = () => {
        if (edit) {
            update()
        } else {
            create()
        }

        setTimeout(() => onHide(), 100)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Введите параметры</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Введите имя</Form.Label>
                        <Form.Control type="text" placeholder="Название" name='name' onChange={handleChange} value={formValue.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Введите почту</Form.Label>
                        <Form.Control type="text" placeholder="Описание" name='email' onChange={handleChange} value={formValue.email}/>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={onHide}>Закрыть</Button>
                <Button onClick={() => {submit()
                }}>Создать</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UsersModal;


