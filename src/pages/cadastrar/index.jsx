import React from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import './index.css';



const Cadastrar = () => {
    
    return (
        <div>
            <Container className='form-height'>
                <Form className='form-signin' >
                    <br/>
                    <small>Coloque seus dados</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome </Form.Label>
                        <Form.Control type="text" placeholder="Nome Completo" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha"  required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Confirmar Senha </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                    <br/><br/>
                    <a href='/login' style={{ marginTop :'30px'}}>Já tenho conta!</a>
                </Form>
            </Container>
        </div>
    )

}

export default Cadastrar;