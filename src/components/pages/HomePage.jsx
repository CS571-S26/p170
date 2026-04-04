import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function HomePage() {
    return (
        <Container className="py-5 text-start">
            <section className="mb-5">
                <h1>Wisconsin Neuromorphic Computing &amp; NeuroAI Lab</h1>
                <p className="lead">
                    We are a student organization within the Wisconsin Innovation Network
                    (WIN), associated with the CS Department at UW&ndash;Madison. Our
                    mission is to explore non-von Neumann architectures and
                    brain-inspired computing&mdash;bridging neuroscience and engineering
                    to push the boundaries of what computers can do.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="mb-4">What We Do</h2>
                <Row xs={1} md={3} className="g-4">
                    <Col>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Hands-On Projects</Card.Title>
                                <Card.Text>
                                    Members collaborate on projects like coding digital neuron
                                    simulations in Python and building dream-inspired AI using
                                    generative models.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Regular Meetings</Card.Title>
                                <Card.Text>
                                    We host meetings throughout the semester where members
                                    present progress, share ideas, and learn from one another.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Research Pathways</Card.Title>
                                <Card.Text>
                                    For those interested in pursuing neuromorphic computing as a
                                    career, we offer connections to full-time research
                                    opportunities.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>

            <section className="text-center">
                <h2 className="mb-3">Get Involved</h2>
                <p className="mb-4">
                    Whether you are a seasoned researcher or just curious about
                    brain-inspired computing, there is a place for you here.
                </p>
                <Button as={Link} to="/mission" variant="dark" size="lg" className="me-3">
                    Our Mission
                </Button>
                <Button as={Link} to="/projects" variant="outline-dark" size="lg">
                    View Projects
                </Button>
            </section>
        </Container>
    );
}

export default HomePage;
