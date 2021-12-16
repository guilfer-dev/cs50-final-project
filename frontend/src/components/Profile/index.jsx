import api from "../../services/api.js"

import { useState, useEffect } from "react"


import { Offcanvas, Nav, Button } from 'react-bootstrap'

import "./styles.css"
import PLACEHOLDERPIC from "../../assets/not_logged.png"
export default function Profile() {

    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [authState, setAuthState] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        (async () => {
            const url = window.location.href

            if (url.includes("?code=")) {
                const [originalURL, code] = url.split("?code=")
                const response = await api.post("/auth", { code })
                if (response.status === 200) {
                    setAuthState(true);
                    setUser(response.data.user)
                    window.history.pushState({}, "", originalURL)
                }
            }
        })()

    }, [])


    return (
        <>
            {authState ?
                <img onClick={handleShow} src={user.avatar_url} className='profile-toogle'></img> :
                <Nav.Link onClick={handleShow}>Login</Nav.Link>
            }

            {authState ?
                <Offcanvas show={show} onHide={handleClose} placement='end' className="profile">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="profile-data">
                        <div className='profile-img'>
                            <img onClick={handleShow} src={user.avatar_url} />
                        </div>
                        <p><strong>Wellcome{user.name ? `, ${user.name.split(" ")[0]}` : ""}!</strong></p>
                        <ul>
                            <li>
                                <a href="">Bookmarks</a>
                            </li>
                            <li>
                                <a href="">Contribuitions</a>
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
                        <Button variant="dark" href={import.meta.env.VITE_GITHUB_CLIENT}>GitHub Account</Button>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </>
    );
}