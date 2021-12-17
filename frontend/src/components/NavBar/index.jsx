import { useState } from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

import Profile from '../Profile'
import logo from '../../assets/logo.png'

import "./styles.css"

export default function NavBar({ setShowModal, categories, setCategoryFilter, categoryFilter }) {

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
                        <Nav.Link onClick={() => setShowModal(true)}>Recommend</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title={categoryFilter || "Categories"} activeKey={categoryFilter} onSelect={e => setCategoryFilter(e)}>
                            <NavDropdown.Item eventKey={"categories"}>Categories</NavDropdown.Item>
                            {categories.map((category, index) =>
                                <NavDropdown.Item key={index} eventKey={category.name}>{category.name}</NavDropdown.Item>
                            )}
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