import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router';
import Hero from '../common/Hero';
import slideArchitecture from '../../assets/slide-architecture.svg';
import slideSpiking from '../../assets/slide-spiking.svg';
import slideCollaboration from '../../assets/slide-collaboration.svg';

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

const slides = [
    {
        src: slideArchitecture,
        alt: 'Stylized illustration showing a red brain on the left connected by neural filaments to a circuit chip on the right, representing the bridge between biology and silicon.',
        caption: 'Bridging Biology and Silicon',
        description:
            'We study non-von Neumann architectures inspired by the structure and dynamics of the brain.',
    },
    {
        src: slideSpiking,
        alt: 'Five horizontal traces showing repeating action potential spikes across multiple neural channels over time.',
        caption: 'Spiking Neural Networks',
        description:
            'Members build and analyze networks that compute with discrete spikes, the language of biological neurons.',
    },
    {
        src: slideCollaboration,
        alt: 'Network graph of interconnected white nodes on a UW red background, with three larger highlighted nodes near the center.',
        caption: 'A Community of Builders',
        description:
            'Students from CS, ECE, neuroscience, and beyond come together to learn, build, and publish.',
    },
];

function HomePage() {
    return (
        <>
            <Hero
                title="Wisconsin Neuromorphic Computing & NeuroAI Lab"
                subtitle={'A student organization within the Wisconsin Innovation Network exploring non-von Neumann architectures and brain-inspired computing at UW–Madison.'}
                primaryCta={{ to: '/mission', label: 'Our Mission' }}
                secondaryCta={{ to: '/projects', label: 'View Projects' }}
            />

            <Container className="py-5 text-start">
                <section className="mb-5">
                    <Carousel
                        fade
                        interval={5500}
                        className="home-carousel shadow-sm"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Highlights from the lab"
                    >
                        {slides.map((slide) => (
                            <Carousel.Item key={slide.caption}>
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="d-block w-100 home-carousel-img"
                                />
                                <Carousel.Caption className="home-carousel-caption text-start">
                                    <p className="home-carousel-title mb-2">{slide.caption}</p>
                                    <p className="mb-0">{slide.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </section>

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
