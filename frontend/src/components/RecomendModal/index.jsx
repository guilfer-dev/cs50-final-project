import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default function AskModal({ show, handleClose }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Recommend something</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Categoy/Subcategory:</Form.Label>
                        <Row>
                            <Col>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select aria-label="Default select example" disabled={false}>
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <Form.Check>
                                    <Form.Check.Input type="checkbox" />
                                    <Form.Check.Label>New subcategory</Form.Check.Label>
                                </Form.Check>
                                <Form.Control type="text" autoComplete='off' maxlength="15" disabled={true} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Youtube URL: </Form.Label>
                        <Form.Control type="text" placeholder="https://www.youtube.com/watch?..." autoComplete='off' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>More about:</Form.Label>
                        <Form.Control type="text" autoComplete='off' />
                        <Form.Text className="text-muted">
                            Why do you think this is a good recommendation?
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary">Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}