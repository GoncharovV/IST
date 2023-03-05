import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { API_SOURCE } from '../../index';

const defaultValue = {
    id: undefined,
    name: '',
}


const ProductModal: React.FC<any> = ({show, onHide, category}) => {
    const edit = !!category;

    const [formValue, setFormValue] = useState(defaultValue)


    useEffect(() => {
        edit && setFormValue(category)
        !edit && setFormValue(defaultValue)
    }, [category])

    const handleChange = (event) => {
        setFormValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const create = async () => {
        await axios.post(API_SOURCE + '/categories', formValue)
    }

    const update = async () => {
        await axios.put(API_SOURCE + '/categories', formValue)
    }

    const submit = async () => {
        if (edit) {
            await update()
        } else {
            await create()
        }

        onHide();
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
                    Создание категории
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Введите параметры</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Введите название</Form.Label>
                        <Form.Control type="text" placeholder="Название" name='name' onChange={handleChange} value={formValue.name}/>
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

export default ProductModal;


