import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const resources = [
    {
        id: 'carver-mead',
        title: 'Analog VLSI and Neural Systems',
        author: 'Carver Mead',
        category: 'Book',
        url: 'https://doi.org/10.1007/978-1-4613-1639-8',
        description:
            'The foundational text on neuromorphic engineering, covering analog circuit design inspired by biological neural systems.',
    },
    {
        id: 'loihi-intro',
        title: 'Loihi: A Neuromorphic Manycore Processor',
        author: 'Davies et al.',
        category: 'Paper',
        url: 'https://doi.org/10.1109/MM.2018.112130359',
        description:
            'Intel\'s introduction of the Loihi chip, a key reference for understanding modern neuromorphic hardware.',
    },
    {
        id: 'snn-tutorial',
        title: 'Spiking Neural Networks: An Introduction',
        author: 'Various',
        category: 'Tutorial',
        url: 'https://snntorch.readthedocs.io/en/latest/tutorials/tutorial_1.html',
        description:
            'A beginner-friendly overview of spiking neural networks, covering neuron models, encoding schemes, and learning rules.',
    },
    {
        id: 'nengo-framework',
        title: 'Nengo: Neural Engineering Framework',
        author: 'Applied Brain Research',
        category: 'Tool',
        url: 'https://www.nengo.ai/',
        description:
            'An open-source Python package for building and simulating large-scale brain models on neuromorphic hardware.',
    },
    {
        id: 'stdp-review',
        title: 'STDP and Its Variants',
        author: 'Bi & Poo',
        category: 'Paper',
        url: 'https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998',
        description:
            'A review of spike-timing-dependent plasticity, the biological learning rule central to many neuromorphic systems.',
    },
    {
        id: 'truenorth-arch',
        title: 'TrueNorth: Design and Tool Flow',
        author: 'Merolla et al.',
        category: 'Paper',
        url: 'https://doi.org/10.1126/science.1254642',
        description:
            'IBM\'s one-million-neuron chip architecture and the programming paradigm behind it.',
    },
];

function ResourcesPage() {
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = sessionStorage.getItem('wnc-resource-bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('wnc-resource-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    function toggleBookmark(id) {
        setBookmarks((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    }

    const categoryColor = {
        Book: 'primary',
        Paper: 'success',
        Tutorial: 'info',
        Tool: 'warning',
    };

    return (
        <Container className="py-5 text-start">
            <h1>Resource Library</h1>
            <p className="lead mb-4">
                A curated collection of books, papers, tutorials, and tools to help you
                get started with neuromorphic computing and NeuroAI. Bookmark items to
                save them for this session.
            </p>

            <Row xs={1} md={2} lg={3} className="g-4">
                {[...resources].sort((a, b) => {
                    const aStarred = bookmarks.includes(a.id);
                    const bStarred = bookmarks.includes(b.id);
                    if (aStarred && !bStarred) return -1;
                    if (!aStarred && bStarred) return 1;
                    return 0;
                }).map((resource) => (
                    <Col key={resource.id}>
                        <Card className="h-100">
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg={categoryColor[resource.category]}>
                                        {resource.category}
                                    </Badge>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 text-decoration-none"
                                        onClick={() => toggleBookmark(resource.id)}
                                        aria-label={
                                            bookmarks.includes(resource.id)
                                                ? `Remove bookmark for ${resource.title}`
                                                : `Bookmark ${resource.title}`
                                        }
                                    >
                                        {bookmarks.includes(resource.id) ? '\u2605' : '\u2606'}
                                    </Button>
                                </div>
                                <Card.Title className="fs-6">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                        {resource.title}
                                    </a>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
                                    {resource.author}
                                </Card.Subtitle>
                                <Card.Text style={{ fontSize: '0.9rem' }}>
                                    {resource.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ResourcesPage;
