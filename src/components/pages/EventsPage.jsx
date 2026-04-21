import { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

const events = [
    {
        date: 'Sep 12, 2024',
        title: 'Kick-Off Meeting',
        description: 'Introduction to the lab, meet the team, and overview of the semester roadmap.',
    },
    {
        date: 'Oct 3, 2024',
        title: 'Neuron Simulation Workshop',
        description: 'Hands-on session building a leaky integrate-and-fire neuron model in Python.',
    },
    {
        date: 'Nov 7, 2024',
        title: 'Dream-Inspired AI Presentation',
        description: 'Members present progress on generative models that mimic aspects of human dreaming.',
    },
    {
        date: 'Dec 5, 2024',
        title: 'End-of-Semester Showcase',
        description: 'Project demos and discussion of future research directions for the spring.',
    },
    {
        date: 'Feb 6, 2025',
        title: 'Spring Planning Session',
        description: 'Planning new projects and recruiting new members for the spring semester.',
    },
    {
        date: 'Mar 13, 2025',
        title: 'SNN Hardware Talk',
        description: 'Guest talk on spiking neural network implementations for edge computing.',
    },
];

function EventsPage() {
    const [rsvps, setRsvps] = useState(() => {
        const saved = localStorage.getItem('wnc-rsvps');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wnc-rsvps', JSON.stringify(rsvps));
    }, [rsvps]);

    function toggleRsvp(key) {
        setRsvps((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }

    return (
        <Container className="py-5 text-start">
            <h1>Events</h1>
            <p className="lead mb-4">
                We meet regularly throughout the academic year. RSVP to any events
                you'd like to attend and we'll keep track across your visits.
            </p>

            <p className="mb-3">
                <Badge bg="danger" className="me-2">
                    {rsvps.length}
                </Badge>
                event{rsvps.length === 1 ? '' : 's'} on your list
            </p>

            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Description</th>
                        <th className="text-end">RSVP</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => {
                        const key = event.date + event.title;
                        const going = rsvps.includes(key);
                        return (
                            <tr key={key} className={going ? 'table-active' : ''}>
                                <td className="text-nowrap">{event.date}</td>
                                <td className="fw-semibold">{event.title}</td>
                                <td>{event.description}</td>
                                <td className="text-end">
                                    <Button
                                        size="sm"
                                        variant={going ? 'danger' : 'outline-danger'}
                                        onClick={() => toggleRsvp(key)}
                                    >
                                        {going ? '\u2713 Going' : 'RSVP'}
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

export default EventsPage;
