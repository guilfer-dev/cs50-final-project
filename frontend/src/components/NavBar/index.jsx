// libraries
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

// components
import Profile from '../Profile'

// styles
import logo from '../../assets/logo.png'
import "./styles.css"

export default function NavBar({ states: {
    setShowModal,
    setCategoryFilter,
    categories,
    categoryFilter
} }) {

    return (
        <Navbar bg="light">
            <Container>
                <Nav>
                    <Nav.Item>
                        {/* logo and link to the homepage of the application */}
                        <Nav.Link href="/">
                            <Navbar.Brand>
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Recommenddit logo"
                                />
                            </Navbar.Brand>
                        </Nav.Link>
                    </Nav.Item>
                    {/* reveal modal to input a new recommendation */}
                    <Nav.Item>
                        <Nav.Link onClick={() => setShowModal(true)}>Recommend</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {/* list all categories brought by the api */}
                        <NavDropdown title={categoryFilter || "Categories"} activeKey={categoryFilter} onSelect={e => setCategoryFilter(e)}>
                            <NavDropdown.Item eventKey={"categories"}>Categories</NavDropdown.Item>
                            {categories.map((category, index) =>
                                <NavDropdown.Item key={index} eventKey={category.name}>{category.name}</NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav.Item>
                </Nav>
                <Nav>
                    {/* render the component that is only a round picture of the user if logged in
                    and brings profile or signin options once its clicked
                    */}
                    <Nav.Item>
                        <Profile className="mr-auto" />
                    </Nav.Item>
                </Nav>
            </Container >
        </Navbar >
    )
}