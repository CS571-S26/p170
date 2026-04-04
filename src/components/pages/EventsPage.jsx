import { Container, Table } from 'react-bootstrap';

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
    return (
        <Container className="py-5 text-start">
            <h1>Events</h1>
            <p className="lead mb-4">
                We meet regularly throughout the academic year. Here is a look at our
                past and upcoming events.
            </p>

            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.date + event.title}>
                            <td className="text-nowrap">{event.date}</td>
                            <td className="fw-semibold">{event.title}</td>
                            <td>{event.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default EventsPage;
