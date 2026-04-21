import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Hero from '../common/Hero';

const highlights = [
    {
        title: 'Hands-On Projects',
        text: 'Members collaborate on projects like coding digital neuron simulations in Python and building dream-inspired AI using generative models.',
    },
    {
        title: 'Regular Meetings',
        text: 'We host meetings throughout the semester where members present progress, share ideas, and learn from one another.',
    },
    {
        title: 'Research Pathways',
        text: 'For those interested in pursuing neuromorphic computing as a career, we offer connections to full-time research opportunities.',
    },
];

function HomePage() {
    return (
        <>
            <Hero
                title="Wisconsin Neuromorphic Computing & NeuroAI Lab"
                subtitle={'A student organization within the Wisconsin Innovation Network exploring non-von Neumann architectures and brain-inspired computing at UW\u2013Madison.'}
                primaryCta={{ to: '/mission', label: 'Our Mission' }}
                secondaryCta={{ to: '/projects', label: 'View Projects' }}
            />

            <Container className="py-5 text-start">
                <section className="mb-5">
                    <h2 className="mb-4">What We Do</h2>
                    <Row xs={1} md={3} className="g-4">
                        {highlights.map((item) => (
                            <Col key={item.title}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>{item.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="text-center pt-3">
                    <h2 className="mb-3">Get Involved</h2>
                    <p className="mb-4">
                        Whether you are a seasoned researcher or just curious about
                        brain-inspired computing, there is a place for you here.
                    </p>
                    <Button
                        as={Link}
                        to="/mission"
                        state={{ scrollTo: 'contact' }}
                        variant="danger"
                        size="lg"
                        className="me-3"
                    >
                        Join Us
                    </Button>
                    <Button
                        as={Link}
                        to="/resources"
                        variant="outline-dark"
                        size="lg"
                    >
                        Browse Resources
                    </Button>
                </section>
            </Container>
        </>
    );
}

export default HomePage;
