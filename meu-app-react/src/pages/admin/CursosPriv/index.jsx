import React, { useEffect, useState }from 'react';
import { Container,Button, Card, Table, From} from 'react-bootstrap';
import { url } from '../../../utis/constants'

const CursosPriv = () => {
    const [idCurso, setIdCurso] = useState(0);
    const [idInstituicao, setIdInstituicao] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [cursos, setCursos] = useState([]);
    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        listarCursos();
        listarInstituicao();
    }, []);

    const listarCursos = () => {
        fetch(url + '/cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarInstituicao = () => {
        fetch(url + '/institucao')
            .then(response => response.json())
            .then(data => {
                setInstituicoes(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setIdCurso(0);
        setIdInstituicao(0);
        setTitulo('');
        setInstituicoes('');
        setCurso('');
    }


    const salvar = (event) => {
        event.preventDefault();

        const curso = {
           idCurso : idCurso,
           titulo : titulo,
           instituicoes : instituicoes,
           cursos : cursos,


        }
        let method = (idCurso === 0 ? 'POST' : 'PUT');
        let urlRequest = (idCurso === 0 ? `${url}/cursos` : `${url}/cursos/${idCurso}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(curso),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Curso salva');

            listarCursos();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/cursos/${event.target.value}`, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyons')
            }
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            setIdCursos(dado.data.idCursos);
            setTitulo(dado.data.titulo);
            setInstituicoes(dado.data.instituicoes);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/cursos/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Curso removida');

            listarCursos();
        })
    }

    return (
        <div>
            <Menu />
         

                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicNome">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Titulo do curso"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Instituição</Form.Label>
                                <Form.Control as="select" size="lg" custom defaultValue={idinstituicao} onChange={event => setInstituicaoId(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {
                                        instituicao.map((item, index) => {
                                            return(
                                                <option value={item.idInstituicao}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>InstituiÇao</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.titulo}</td>
                                        <td>{item.instituicao?.nome}</td>
                                        <td>
                                            <Button variant="warning" value={item.idCurso} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.idCurso} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        </div>
    )
    
}
export default CursosPriv;