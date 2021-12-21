// libraries
import { useState, useEffect } from "react"
import { Offcanvas, Nav, Button } from 'react-bootstrap'

// api service
import api from "../../services/api.js"

// styles
import PLACEHOLDERPIC from "../../assets/not_logged.png"
import "./styles.css"

export default function Profile({ authState, setAuthState }) {

    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});

    function handleModalState() {
        setShow(!show);
    }

    // verify if user has login information from localstorage
    useEffect(() => {

        const url = window.location.href
        const userStored = localStorage.getItem("user");
        const tokenStored = localStorage.getItem("token");
        (async () => {

            // sets user data from the localstorage
            if (userStored && tokenStored) {

                setAuthState(true);
                setUser(JSON.parse(userStored));

                // brings user data from the api, the code needed to get a token comes as a parameter in the url
            } else if (url.includes("?code=")) {
                const [originalURL, code] = url.split("?code=")
                const response = await api.post("/auth", { code })
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    setAuthState(true);
                    setUser(response.data.user)
                    // hides the code from the the user once the login is done
                    window.history.pushState({}, "", originalURL)
                }
            }
        })()

    }, [])


    return (<>
        {/* renders different offcanvas component and "icon" if the users is logged */}
        {authState ?
            <>
                <img onClick={handleModalState} src={user.avatar_url} className='profile-toogle'></img>
                <Offcanvas show={show} onHide={handleModalState} placement='end' className="profile">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="profile-data">
                        <div className='profile-img'>
                            <img onClick={handleModalState} src={user.avatar_url} />
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
                </Offcanvas>
            </>
            :
            <>
                <Nav.Link onClick={handleModalState}>Login</Nav.Link>
                <Offcanvas show={show} onHide={handleModalState} placement='end' className="profile">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Signin/Signup</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="profile-data">
                        <div className='profile-img'>
                            <img onClick={handleModalState} src={PLACEHOLDERPIC} />
                        </div>
                        <p><strong>Wellcome</strong></p>
                        {/* redirects user to oauth link */}
                        <Button variant="dark" href={import.meta.env.VITE_GITHUB_CLIENT}>GitHub Account</Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        }
    </>
    );
}