import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {url} from '../../utils/constants';

const Cursos = () => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        listarCursos();
    }, []);

    const listarCursos = () => {
        fetch(url + '/cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data)
            })
            .catch(err => console.error(err));
    }
    return(
        <div>
               <Row>
                   {
                       eventos.map((item, index) => {
                           return (
                               <Col xs='4'>
                                   <Card style={{ width: '18rem' }}>
                                   <Card.Body>
                                       <Card.Title>{item.Titulo}</Card.Title>
                                       <Card.Text>{item.Instituicao}</Card.Text>
                                       
                                   </Card.Body>
                                   </Card>
                               </Col>
                           )
                       })
                   }
               </Row>
    </div>
    )
}
export default Cursos;