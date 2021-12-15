import { Offcanvas, Nav, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

import "./styles.css"


import PROFILEPIC from "../../assets/profile.jpg"
import PLACEHOLDERPIC from "../../assets/not_logged.png"
const NAME = "Giovana"
const LOGGED = true;
export default function Profile() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {LOGGED ?
                <img onClick={handleShow} src={PROFILEPIC} className='profile-toogle'></img> :
                <Nav.Link onClick={handleShow}>Login</Nav.Link>
            }

            {LOGGED ?
                <Offcanvas show={show} onHide={handleClose} placement='end' className="profile">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="profile-data">
                        <div className='profile-img'>
                            <img onClick={handleShow} src={PROFILEPIC} />
                        </div>
                        <p><strong>Wellcome {NAME}</strong></p>
                        <ul>
                            <li>
                                <a href="">Bookmarks</a>
                            </li>
                            <li>
                                <a href="">My Contribuitions</a>
                            </li>
                            <li>
                                <a href="">Exit</a>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas> :

                <Offcanvas show={show} onHide={handleClose} placement='end' className="profile">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Signin/Signup</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="profile-data">
                        <div className='profile-img'>
                            <img onClick={handleShow} src={PLACEHOLDERPIC} />
                        </div>
                        <p><strong>Wellcome</strong></p>
                        <Button variant="dark" type="submit">
                            Github
                        </Button>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </>
    );
}