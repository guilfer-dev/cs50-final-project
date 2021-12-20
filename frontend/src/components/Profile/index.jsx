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

        const url = window.location.href
        const userStored = localStorage.getItem("user");
        const tokenStored = localStorage.getItem("token");
        (async () => {

            if (userStored && tokenStored) {

                setAuthState(true);
                setUser(JSON.parse(userStored));

            } else if (url.includes("?code=")) {
                const [originalURL, code] = url.split("?code=")
                const response = await api.post("/auth", { code })
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user))
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
                                <a href="/bookmarks">Bookmarks</a>
                            </li>
                            <li>
                                <a href="/contributions">Contribuitions</a>
                            </li>
                            <li>
                                <a href="" onClick={() => {
                                    localStorage.clear();
                                    location.reload();
                                }}>Exit</a>
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