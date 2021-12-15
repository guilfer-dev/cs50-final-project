import { Nav, Navbar, Form, FormControl, Container, NavDropdown } from 'react-bootstrap'

import Profile from '../Profile'
import logo from '../../assets/logo.png'

import "./styles.css"

export default function NavBar({ handleShow }) {

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
                        <Nav.Link onClick={handleShow}>Recommend</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
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