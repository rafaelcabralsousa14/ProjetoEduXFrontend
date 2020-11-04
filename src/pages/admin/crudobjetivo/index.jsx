import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Container,Table, Form, Button, Card } from 'react-bootstrap';
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const Objetivo = () => {

    const [ idObjetivo, setId ] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [objetivos, setObjetivos] = useState([]);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        listarCategorias();
        listarObjetivos();
    },[]);

    const listarCategorias = () => {

        fetch(`${url}/categoria`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
            .then(response => response.json())
            .then(dados => {
                setCategorias(dados.data);
            })
            .catch(err => console.error(err));
    }

    const listarObjetivos= () => {
        fetch(`${url}/objetivo`, {
            headers : {
                        
                        
                            
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            
        }
        })
        .then(response => response.json())
        .then(dados => {
            setObjetivo(dados.data);

            limparCampos();
        })
        .catch(err => console.error(err));
    }
    
    const limparCampos = () => {
            
            setId(0);    
            setIdCategoria('');
            
            setDescricao('');
    }

    const salvar = ( event) => {
        event.preventDefault();

        const objetivo = {
            idCategoria : idCategoria, 
            descricao : descricao
        }
    

    let method = (id === 0 ? 'POST' : 'PUT');
    let urlRequest = (id === 0 ? `${url}/Objetivo` :  `${url}/Objetivo/${id}`);

    fetch(urlRequest, {
        method : method,
        body : JSON.stringify(objetivo),
        headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }
    })
    .then(response => response.json())
        .then(dados => {
           console.log(dados);
            alert('Objetivo salvo');

            listarObjetivos();
        })
        .catch(err => console.error(err))
    }
    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/objetivo/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
          
            setId(dado.id)
            setDescricao(dado.descricao);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/objetivo/' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Objetivo removido');

            listarObjetivos();
        })
    }


    return(
        <div style={{ background: '#444444' }}>
        <Menu />
        <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Objetivos"
                chamada="Gerenciar objetivos."
            />
            <Card >
                <Card.Body>
                    <Form onSubmit={event => salvar(event)}>
                        <Form.Group controlId="formBasicPerfil">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select">
                                {
                                    categorias.map((item, index) => {
                                        return (
                                            <option value={item.idCategoria}>{item.nome}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                     
                        <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Descrição de Objetivo." />
                        </Form.Group>
                        <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                <thead>
                    <tr>
                        
                        <th>Categoria</th>
                        <th>Descrição</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.categoria}</td>
                                    <td>{item.nome}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button variant="info" value={item.idObjetivo} onClick={event => editar(event)} >Editar</Button>
                                        <Button variant="danger" value={item.idObjetivo} onClick={event => excluir(event)} style={{ marginLeft: '20px' }}>Remover</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </Container>
        <Rodape />
    </div>
)
}
export default Objetivo;
