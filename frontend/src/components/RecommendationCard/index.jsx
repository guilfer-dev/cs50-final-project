import { Card, Badge, Col, Row, Container } from 'react-bootstrap';

import CardBreadCrumb from '../CardBreadCrumb'


import "./styles.css"
import placeholder from "../../assets/placeholder.png"


export default function RecommendationCard() {

    return (

        <Card className="my-4">
            <Card.Header>
                <CardBreadCrumb />
                <Card.Title>Special title treatment</Card.Title>
                <div>
                    <Badge bg="primary">Primary</Badge> {' '}
                    <Badge bg="success">Success</Badge> {' '}
                    <Badge bg="danger">Danger</Badge>
                </div>
            </Card.Header>
            <Card.Body>
                <Container fluid>
                    <Row>
                        <Col className="action-container">
                            <button className="material-icons upvote">arrow_upward</button>
                            <span>13</span>
                            <button className="material-icons downvote">arrow_downward</button>
                            <button className="material-icons bookmark">bookmark</button>
                        </Col>
                        <Col className="content-container">
                            <Card.Img variant="top" src={placeholder} className="content-preview" />
                            <p><strong>Why:</strong></p>
                            <p><strong>Expected spent time:</strong></p>
                            <button><span className="material-icons">comment</span>100</button>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card >
    )
}