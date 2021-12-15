import { Card, Badge, Col, Row, Container } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"
import placeholder from "../../assets/placeholder.png"
const COMMENTS = 100;
const VOTES = 13;
const TEXT = "O vídeo fornece uma maneira poderosa de ajudá-lo a provar seu argumento. Ao clicar em Vídeo Online, você pode colar o código de inserção do vídeo que deseja adicionar. Você também pode digitar uma palavra-chave para pesquisar online o vídeo mais adequado ao seu documento.";

export default function RecommendationCard() {

    return (

        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb />
                <Card.Title>Special title treatment</Card.Title>
            </Card.Header>
            <Card.Body>
                <Col className="action-container">
                    <button className="material-icons upvote">arrow_upward</button>
                    <span>{VOTES}</span>
                    <button className="material-icons downvote">arrow_downward</button>
                    <button className="material-icons bookmark">bookmark</button>
                    <button className="material-icons comments">comment</button>
                    <br />
                    <span >{COMMENTS}</span>
                </Col>
                <Col className="content-container">
                    <Card.Img variant="top" src={placeholder} className="content-preview" />
                    <p><strong>More about:</strong>{` ${TEXT}`}</p>
                </Col>
            </Card.Body>
        </Card >
    )
}