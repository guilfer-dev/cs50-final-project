import { Nav, Navbar, Form, FormControl, Container, NavDropdown } from 'react-bootstrap'

import Profile from '../Profile'
import logo from '../../assets/logo.png'

import "./styles.css"

export default function NavBar() {

    return (
        <Navbar bg="light">
            <Container>
                <Nav>
                    <Nav.Item>
                        <Navbar.Brand href="#home" >
                            <img
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Recommenddit logo"
                            />
                        </Navbar.Brand>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#home">Ask</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">Recommend</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled">
                            Categories
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>

                    <Nav.Item>
                        <Profile className="mr-auto" />
                    </Nav.Item>
                </Nav>
            </Container >
        </Navbar >
    )
}