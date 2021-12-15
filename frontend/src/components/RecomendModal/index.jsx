import { Button, Modal, Form } from 'react-bootstrap';

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