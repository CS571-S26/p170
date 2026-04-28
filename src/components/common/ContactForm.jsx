import { useState } from 'react';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdqngwj';
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
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const nameEmpty = form.name.trim().length === 0;
    const messageTooShort = form.message.trim().length < 10;

    async function handleSubmit(e) {
        e.preventDefault();

        const nativeValid = e.currentTarget.checkValidity();
        if (!nativeValid || nameEmpty || messageTooShort) {
            setValidated(true);
            return;
        }

        const name = form.name.trim();
        const email = form.email.trim();
        const message = form.message.trim();
        const interest = interestLabel[form.interest];

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    interest,
                    message,
                    _subject: `WNC Lab contact from ${name}`,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                const detail = data?.errors?.map((er) => er.message).join(', ');
                throw new Error(detail || `Submission failed (${res.status})`);
            }

            setSubmittedName(name);
            setForm(emptyForm);
            setValidated(false);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    function update(field) {
        return (e) => setForm({ ...form, [field]: e.target.value });
    }

    if (submittedName) {
        return (
            <Alert variant="success" className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <span>
                    Thanks, <strong>{submittedName}</strong> — your message has been
                    sent. A member of the team will follow up by email.
                </span>
                <Button variant="outline-success" size="sm" onClick={() => setSubmittedName(null)}>
                    Send another
                </Button>
            </Alert>
        );
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group controlId="contactName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={form.name}
                            onChange={update('name')}
                            isInvalid={validated && nameEmpty}
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
                            pattern=".*@[wW][iI][sS][cC]\.[eE][dD][uU]"
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

            <Button
                type="submit"
                variant="danger"
                className="mt-3"
                disabled={submitting}
            >
                {submitting ? (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />
                        Sending...
                    </>
                ) : (
                    'Send message'
                )}
            </Button>
        </Form>
    );
}

export default ContactForm;