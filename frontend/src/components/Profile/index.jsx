import { Offcanvas } from 'react-bootstrap'
import { useState } from 'react'

import "./styles.css"


import PROFILEPIC from "../../assets/profile.jpg"
const NAME = "Giovana"

export default function Profile() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <img onClick={handleShow} src={PROFILEPIC} className='profile-toogle'></img>

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
            </Offcanvas>
        </>
    );
}