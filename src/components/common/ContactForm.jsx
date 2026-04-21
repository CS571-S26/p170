import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const emptyForm = { name: '', email: '', interest: 'projects', message: '' };

function ContactForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [submittedName, setSubmittedName] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const valid = e.currentTarget.checkValidity();
        if (!valid) {
            setValidated(true);
            return;
        }
        setSubmittedName(form.name);
        setForm(emptyForm);
        setValidated(false);
    }

    function update(field) {
        return (e) => setForm({ ...form, [field]: e.target.value });
    }

    if (submittedName) {
        return (
            <Alert variant="success" className="d-flex align-items-center justify-content-between">
                <span>
                    Thanks, <strong>{submittedName}</strong> — we'll be in touch soon.
                </span>
                <Button variant="outline-success" size="sm" onClick={() => setSubmittedName(null)}>
                    Send another
                </Button>
            </Alert>
        );
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group controlId="contactName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={form.name}
                            onChange={update('name')}
                            placeholder="Jane Badger"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="contactEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            value={form.email}
                            onChange={update('email')}
                            placeholder="you@wisc.edu"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mt-3" controlId="contactInterest">
                <Form.Label>Primary interest</Form.Label>
                <Form.Select value={form.interest} onChange={update('interest')}>
                    <option value="projects">Hands-on projects</option>
                    <option value="research">Research pathways</option>
                    <option value="hardware">Neuromorphic hardware</option>
                    <option value="general">General curiosity</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3" controlId="contactMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    required
                    as="textarea"
                    rows={4}
                    minLength={10}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us a bit about yourself and what you'd like to explore..."
                />
                <Form.Control.Feedback type="invalid">
                    Tell us a bit about yourself (at least 10 characters).
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" className="mt-3">
                Send message
            </Button>
        </Form>
    );
}

export default ContactForm;
