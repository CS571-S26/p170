import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from '../common/ContactForm';

const values = [
    {
        title: 'Curiosity-Driven Exploration',
        text: 'We believe the best breakthroughs come from asking bold questions. Our members are encouraged to pursue ideas that excite them, even when the path is unclear.',
    },
    {
        title: 'Interdisciplinary Collaboration',
        text: 'Neuromorphic computing sits at the intersection of computer science, neuroscience, and electrical engineering. We welcome perspectives from every discipline.',
    },
    {
        title: 'Accessible Learning',
        text: 'No prior experience in neuroscience or hardware design is required. We build understanding together through workshops, project work, and peer mentoring.',
    },
    {
        title: 'Research with Impact',
        text: 'We aim to connect student projects to real research opportunities, helping members build skills that translate into academic and industry careers.',
    },
];

function MissionPage() {
    return (
        <Container className="py-5 text-start">
            <h1>Mission &amp; Values</h1>
            <p className="lead mb-4">
                The Wisconsin Neuromorphic Computing &amp; NeuroAI Lab is a student
                organization within the Wisconsin Innovation Network (WIN), associated
                with the CS Department at UW&ndash;Madison. Our purpose is to explore
                non-von Neumann architectures and brain-inspired computing&mdash;making
                these cutting-edge topics accessible to anyone willing to learn.
            </p>

            <section className="mb-5">
                <h2>Our Mission</h2>
                <p>
                    We exist to give students a space to experiment with neuromorphic
                    hardware, spiking neural networks, and neuro-inspired algorithms.
                    Through hands-on projects, regular meetings, and connections to
                    research labs, we help members build deep expertise in a field that
                    is shaping the future of computing.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="mb-4">Our Values</h2>
                <Row xs={1} md={2} className="g-4">
                    {values.map((value) => (
                        <Col key={value.title}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>{value.title}</Card.Title>
                                    <Card.Text>{value.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section>
                <h2 className="mb-3">Get in Touch</h2>
                <p className="mb-4">
                    Interested in joining, collaborating, or just learning more? Drop us
                    a line and a member of the team will follow up.
                </p>
                <Card>
                    <Card.Body>
                        <ContactForm />
                    </Card.Body>
                </Card>
            </section>
        </Container>
    );
}

export default MissionPage;
