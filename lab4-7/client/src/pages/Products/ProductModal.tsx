import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { API_SOURCE } from '../../index';

const defaultValue = {
    title: '',
    description: '',
    categoryId: -1,
    userId: -1,
    price: 0,
    image: 'https://sun9-80.userapi.com/impf/c840332/v840332687/2f931/ataVAsLIxsY.jpg?size=604x403&quality=96&sign=de1d9271c75fc1297005c77d4e769bb7&type=album',
}


const ProductModal: React.FC<any> = ({show, onHide, product}) => {
    const edit = !!product;

    const [formValue, setFormValue] = useState(defaultValue)

    const [categories, setCategories] = useState<any>([])
    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        edit && setFormValue(product)
        !edit && setFormValue(defaultValue)
    }, [product])

    const handleChange = (event) => {
        setFormValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const create = () => {
        axios.post(API_SOURCE + '/products', formValue)
    }

    const update = () => {
        axios.put(API_SOURCE + '/products', formValue)
    }

    const submit = () => {
        if (edit) {
            update()
        } else {
            create()
        }

        setTimeout(() => onHide(), 100)
        setFormValue(defaultValue)
    }

    const getCategories = async () => {
        const categories = await axios.get(API_SOURCE + '/categories')

        setCategories(categories.data)
    }

    const getUsers = async () => {
        const users = await axios.get(API_SOURCE + '/users')

        setUsers(users.data)
    }

    useEffect(() => {

        getCategories()
        getUsers()

    }, [])

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
                    ???????????????????? ????????????
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>?????????????? ??????????????????</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>?????????????? ????????????????</Form.Label>
                        <Form.Control type="text" placeholder="????????????????" name='title' onChange={handleChange} value={formValue.title}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>?????????????? ????????????????</Form.Label>
                        <Form.Control type="text" placeholder="????????????????" name='description' onChange={handleChange} value={formValue.description}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryId">
                        <Form.Label>???????????????? ??????????????????</Form.Label>
                        <Form.Select aria-label="Default select example" name='categoryId' onChange={handleChange} value={formValue.categoryId}>
                            <option value={-1}>???? ??????????????</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userId">
                        <Form.Label>?????????????? ????????????</Form.Label>
                        <Form.Select aria-label="Default select example" name='userId' onChange={handleChange} value={formValue.userId}>
                            <option value={-1}>???? ??????????????</option>
                            {
                                users.map(user => (
                                    <option key={user.id} value={user.id}>{user.email}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>????????</Form.Label>
                        <Form.Control type="number" placeholder="????????" name='price' onChange={handleChange} value={formValue.price}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>???????????? ???? ????????????????</Form.Label>
                        <Form.Control type="text" placeholder="????????????" name='image' onChange={handleChange} value={formValue.image}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={onHide}>??????????????</Button>
                <Button onClick={() => {submit()
                }}>??????????????</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;


