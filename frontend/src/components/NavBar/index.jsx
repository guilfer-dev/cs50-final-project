import { Nav, Navbar, Form, FormControl, Container, Row, Col, Button } from 'react-bootstrap'

import "./styles.css"

export default function NavBar() {

    return (
        <Navbar expand="lg">
            <Container>
                <Nav>
                    <Row>
                        <Col>
                            <Navbar.Brand href="#home" >Recomenddit</Navbar.Brand>
                        </Col>
                        <Col>
                            <Nav.Link href="#home">Ask</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#link">Recommend</Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Col>
                    </Row>
                </Nav>
            </Container>
        </Navbar >
    )
}