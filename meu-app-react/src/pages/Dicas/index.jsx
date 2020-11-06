import React from'react';
import { Container,Button, Card, Table, From} from 'react-bootstrap';
import { url } from '../../../utis/constants';

const Dicas = () => {
    const [id, setId] = useState(0);
    const [texto, setTexto] = useState('');
    const [imagem, setImagem] = useState('');
    const [dica, setDica] = useState([]);
    const [idUsuario, setIdUsuario] = useState('');

    useEffect(() => {
        ListarDicas();
        listarInstituicao();
    }, []);

    const ListarDicas = () => {
        fetch(url + '/dicas')
            .then(response => response.json())
            .then(data => {
                setInstituicoes(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const listarCursos = () => {
        fetch(url + '/cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setId(0);
        setTexto('');
        setidUsuario('');
        setImagem(0);
        setUrlImagem('');
        setDica('');
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.target.files[0]);

        fetch(`${url}/upload`,{
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err))

    }

    const salvar = (event) => {
        event.preventDefault();

        const dicas = {
            texto : texto,
            instituição : instituição,
            urlImagem :urlImagem,
            idUsuario : idUsuario,
            DicaId : categoriaId,
            descricao : descricao,

        }
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/dicas` : `${url}/dicas/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(dicas),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dicas => {
            alert('Dica salva');

            listarCursos();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/dicas/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            setId(dado.data.id);
            setTexto(dado.data.texto);

            setUrlImagem(dado.data.urlImagem);

            setDica(dado.data.dica);
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
            alert(' Dica removida');

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
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setTexto(event.target.value)} placeholder="Descrição do curso"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" size="lg" custom defaultValue={instituicaoId} onChange={event => setInstituicoes(event.target.value)} >
                                    <option value={0}>Selecione</option>
                                    {
                                        categorias.map((item, index) => {
                                            return(
                                                <option value={item.id}>{item.instituicao}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id="fileCategoria" label="Imagem do evento" onChange={event => { uploadFile(event)}} />
                                {urlImagem && <img src={urlImagem} style={{ width : '160px'}} />}
                            </Form.Group>
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Texto</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            eventos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.urlImagem} style={{ width : '120px'}}/></td>
                                        <td>{item.texto}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
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
export default Dicas;