import { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    Form,
    InputGroup,
} from 'react-bootstrap';

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

const categoryColor = {
    Book: 'primary',
    Paper: 'success',
    Tutorial: 'info',
    Tool: 'warning',
};

function ResourcesPage() {
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = sessionStorage.getItem('wnc-resource-bookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        sessionStorage.setItem('wnc-resource-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    function toggleBookmark(id) {
        setBookmarks((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    }

    const categories = useMemo(
        () => ['All', ...new Set(resources.map((r) => r.category))],
        []
    );

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = resources.filter((r) => {
            const matchesCategory = category === 'All' || r.category === category;
            const matchesQuery =
                !q ||
                r.title.toLowerCase().includes(q) ||
                r.author.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
        return filtered.sort((a, b) => {
            const aStar = bookmarks.includes(a.id);
            const bStar = bookmarks.includes(b.id);
            if (aStar && !bStar) return -1;
            if (!aStar && bStar) return 1;
            return 0;
        });
    }, [query, category, bookmarks]);

    return (
        <Container className="py-5 text-start">
            <h1>Resource Library</h1>
            <p className="lead mb-4">
                A curated collection of books, papers, tutorials, and tools to help you
                get started with neuromorphic computing and NeuroAI. Search, filter, and
                star items to pin them to the top for this session.
            </p>

            <Row className="g-3 mb-4">
                <Col md={7}>
                    <InputGroup>
                        <InputGroup.Text>Search</InputGroup.Text>
                        <Form.Control
                            type="search"
                            placeholder="title, author, or keyword..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <Button variant="outline-secondary" onClick={() => setQuery('')}>
                                Clear
                            </Button>
                        )}
                    </InputGroup>
                </Col>
                <Col md={5}>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        aria-label="Filter resources by category"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c === 'All' ? 'All categories' : c}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <p className="text-muted small mb-3">
                Showing {visible.length} of {resources.length} resources
                {bookmarks.length > 0 && ` \u00b7 ${bookmarks.length} starred`}
            </p>

            {visible.length === 0 ? (
                <p className="text-muted fst-italic">
                    No resources match your search. Try a different keyword or category.
                </p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {visible.map((resource) => (
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
                                            className="p-0 text-decoration-none star-button"
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
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {resource.title}
                                        </a>
                                    </Card.Title>
                                    <Card.Subtitle
                                        className="mb-2 text-muted"
                                        style={{ fontSize: '0.85rem' }}
                                    >
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
            )}
        </Container>
    );
}

export default ResourcesPage;
