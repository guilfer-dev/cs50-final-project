import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

export default function NavBar() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Recomenddit</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Ask recomendations</Nav.Link>
                        <Nav.Link href="#link">Recommend something</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}