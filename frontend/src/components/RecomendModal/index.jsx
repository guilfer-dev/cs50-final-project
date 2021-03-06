// libraries
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// api service
import api from "../../services/api.js";

export default function AskModal({ states: {
    setShowModal,
    setRecommendations,
    updateSubcategories,
    showModal,
    recommendations,
    setContributions,
    contributions
} }) {

    // error handling
    const [error, setError] = useState("");
    // form select options
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [newSubCategory, setNewSubCategory] = useState(false);

    // form data
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [video, setVideo] = useState("");
    const [about, setAbout] = useState("");

    // loads available categories and subcategories from api
    useEffect(() => {
        (async () => {
            const { data } = await api.get("/categories");
            setCategories(data);
        })();
    }, [])

    // refresh subcategory options when a new category is picked
    function handleSelectCategory(value) {
        setCategory(value);
        if (value) {
            setSubCategories(categories.find(category => category.name === value).subcategories);
        } else {
            setSubCategories([])
        }
    }

    // clear possible previous state for the subcategory and block oposite (new or old subcategory) fields
    function handleNewCategory() {
        setSubCategory("")
        if (newSubCategory) {
            setNewSubCategory(false)
            setSubCategories(categories.find(ele => ele.name === category).subcategories);
        } else {
            setNewSubCategory(true)
            setSubCategories([])
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {

            // define data that will be sent  to the api
            const newRecommendation = {
                title,
                category,
                subcategory: subCategory,
                video,
                about
            };

            /* send data from the api and get the information to add to the list without the need to
            without the need to make a new call to the api */
            const { data } = await api.post("/recommendations", newRecommendation);


            if (newSubCategory) {
                updateSubcategories(data.subcategory)
            }

            setRecommendations([data, ...recommendations]);
            setContributions([data._id, ...contributions])

            handleClose();
        }
        catch (err) {
            console.log(err);
            setError(err.response.data.msg)
        }
    }

    // reset the states and close the model
    function handleClose() {
        setTitle("");
        setCategory("");
        setSubCategory("");
        setVideo("");
        setAbout("");
        setNewSubCategory(false);
        setShowModal(false)
    };

    return (
        // render the form with all fields necessary to create a new recommendation
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Recommend something</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="new-recommendation" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" autoComplete='off' required value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Label>Categoy/Subcategory:</Form.Label>
                        <Row>
                            <Col>
                                <Form.Select onChange={e => handleSelectCategory(e.target.value)}>
                                    <option></option>
                                    {categories.map((category, index) =>
                                        <option value={category.name} key={index}>{category.name}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select disabled={newSubCategory} required={!newSubCategory} value={subCategory} onChange={e => setSubCategory(e.target.value)}>
                                    <option></option>
                                    {subCategories.map((subcategory, index) =>
                                        <option value={subcategory} key={index}>{subcategory}</option>
                                    )}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <Form.Check>
                                    <Form.Check.Input type="checkbox" onChange={handleNewCategory} />
                                    <Form.Check.Label>New subcategory:</Form.Check.Label>
                                </Form.Check>
                                <Form.Control type="text" autoComplete='off' maxLength="15" disabled={!newSubCategory} required={newSubCategory} value={newSubCategory ? subCategory : ""} onChange={e => setSubCategory(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Youtube URL: </Form.Label>
                        <Form.Control type="text" placeholder="https://www.youtube.com/watch?..." autoComplete='off' required value={video} onChange={e => setVideo(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>More about:</Form.Label>
                        <Form.Control type="text" autoComplete='off' required value={about} onChange={e => setAbout(e.target.value)} />
                        <Form.Text className="text-muted">
                            Why do you think this is a good recommendation?
                        </Form.Text>
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" form="new-recommendation">Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}