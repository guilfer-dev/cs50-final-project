import { Card, Badge } from 'react-bootstrap';

import BreadCrumb from '../BreadCrumb'

import placeholder from "../../assets/placeholder.png"

export default function RecommendationCard() {

    return (

        <Card className="my-4">
            <Card.Header>
                <BreadCrumb />
                <div>
                    <Badge bg="primary">Primary</Badge> {' '}
                    <Badge bg="success">Success</Badge> {' '}
                    <Badge bg="danger">Danger</Badge>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <span class="material-icons">arrow_upward</span>
                <span class="material-icons">bookmark</span>
                <span class="material-icons">arrow_downward</span>
                <Card.Img variant="top" src={placeholder} style={{ width: "50%" }} />
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    )
}