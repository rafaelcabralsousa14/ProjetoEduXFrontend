import React, { useEffect, useState } from 'react'
import { Container,Table, Form, Button, Card  } from 'react-bootstrap';
import { url } from '../../../utils/constants'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const CrudTurma = () => {
    const [idTurma, setIdTurma] = useState(0);
    const [periodo, setPeriodo] = useState('');
    const [cursos, setCursos] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [descricao, setDescricao] = useState([]);


    useEffect(() => {
        listarCursos()
    }, []);

    const listarCursos = () => {
        fetch(url + 'turma')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}curso/${event.target.value}`)
            .then(response => response.json())
            .then(dado => {
                console.log(dado)
                setIdTurma(dado.IdTurma)
                setPeriodo(dado.periodo)
            })
    }

    const excluir = (event) => {
        event.preventDefault();

        console.log(event.target.value)

        fetch(url + 'turma/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Turma removida.')
                listarCursos()
            })
    }

    const salvar = (event) => {
        event.preventDefault();

        const curso = {
            periodo: periodo
        }

        let method = (idTurma === 0 ? 'POST' : 'PUT')
        let urlRequest = (idTurma === 0 ? `${url}turma` : `${url}turma/${idTurma}`)

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(curso),
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
            .then(response => response.json())
            .then(dados => {
                alert('Turma adicionada.');
                listarCursos();
            })
    }

    const limparCampos = () => {
        setIdTurma(0);
        setPeriodo('');
    }

    return (
        <div style={{ background: '#444444' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
                <Titulo
                    titulo="Turmas"
                    chamada="Gerenciar turmas."
                />
                <Card >
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicPerfil">
                                <Form.Label>Cursos</Form.Label>
                                <Form.Control as="select">
                                    {
                                        cursos.map((item, index) => {
                                            return (
                                                <option value={item.idCursos}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Período</Form.Label>
                                <Form.Control type="text" value={periodo} onChange={event => setPeriodo(event.target.value)} placeholder="Insira o período" />
                            </Form.Group>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Descrição da turma." />
                            </Form.Group>
                            <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                    <thead>
                        <tr>
                            <th>Curso</th>
                            <th>Periodo</th>
                            <th>Descrição</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.periodo}</td>
                                        <td>{item.nome}</td>
                                        <td style={{ display: 'flex' }}>
                                            <Button variant="info" value={item.IdTurma} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.IdTurma} onClick={event => excluir(event)} style={{ marginLeft: '20px' }}>Remover</Button>
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

export default CrudTurma;