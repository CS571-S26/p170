import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const CONTACT_EMAIL = 'amahoney6@wisc.edu';
const emptyForm = { name: '', email: '', interest: 'projects', message: '' };

const interestLabel = {
    projects: 'Hands-on projects',
    research: 'Research pathways',
    hardware: 'Neuromorphic hardware',
    general: 'General curiosity',
};

function ContactForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [submittedName, setSubmittedName] = useState(null);

    const messageTooShort = form.message.trim().length < 10;

    const emailMissingWisc = !form.email.toLowerCase().includes('wisc.edu');

    function handleSubmit(e) {
        e.preventDefault();
        const nativeValid = e.currentTarget.checkValidity();
        if (!nativeValid || messageTooShort || emailMissingWisc) {
            setValidated(true);
            return;
        }
        const name = form.name.trim();
        const email = form.email.trim();
        const message = form.message.trim();
        const subject = `WNC Lab contact from ${name}`;
        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Interest: ${interestLabel[form.interest]}\n\n` +
            message;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;
        setSubmittedName(name);
        setForm(emptyForm);
        setValidated(false);
    }

    function update(field) {
        return (e) => setForm({ ...form, [field]: e.target.value });
    }

    if (submittedName) {
        return (
            <Alert variant="success" className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <span>
                    Thanks, <strong>{submittedName}</strong> — your email client should
                    be open with the draft. Send it when you're ready and we'll follow up.
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
                            isInvalid={validated && emailMissingWisc}
                            placeholder="you@wisc.edu"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid UW-Madison email address.
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
                    value={form.message}
                    onChange={update('message')}
                    isInvalid={validated && messageTooShort}
                    placeholder="Tell us a bit about yourself and what you'd like to explore..."
                />
                <Form.Control.Feedback type="invalid">
                    Please enter at least 10 non-whitespace characters.
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" className="mt-3">
                Send message
            </Button>
        </Form>
    );
}

export default ContactForm;
