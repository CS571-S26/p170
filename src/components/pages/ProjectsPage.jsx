import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from '../common/ProjectCard';

const projects = [
    {
        id: 'neuron-sim',
        title: 'Digital Neuron Simulation',
        description:
            'A Python-based simulation of biological neurons using the Hodgkin-Huxley and leaky integrate-and-fire models. Members build and visualize spiking behavior to understand the computational primitives of the brain.',
        tags: ['Python', 'Neuroscience', 'Simulation'],
    },
    {
        id: 'dream-ai',
        title: 'Dream-Inspired AI',
        description:
            'An exploration of generative models that mimic aspects of human dreaming. The project investigates how replay and recombination during offline processing can improve learning in neural networks.',
        tags: ['Generative Models', 'Deep Learning', 'Creativity'],
    },
    {
        id: 'snn-edge',
        title: 'Spiking Neural Networks for Edge Computing',
        description:
            'Developing energy-efficient SNN implementations targeting neuromorphic hardware platforms for real-time sensor processing at the edge.',
        tags: ['SNN', 'Hardware', 'Edge Computing'],
    },
    {
        id: 'memristive-learning',
        title: 'Memristive Crossbar Learning',
        description:
            'Investigating spike-timing-dependent plasticity (STDP) learning rules that can be mapped to memristive crossbar arrays for on-chip learning.',
        tags: ['STDP', 'Memristors', 'Hardware'],
    },
];

function ProjectsPage() {
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = sessionStorage.getItem('wnc-bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('wnc-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    function toggleBookmark(id) {
        setBookmarks((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    }

    return (
        <Container className="py-5 text-start">
            <h1>Projects</h1>
            <p className="lead mb-4">
                Our members collaborate on hands-on projects that span neuron modeling,
                generative AI, and neuromorphic hardware. Bookmark any project to save
                it for this session.
            </p>

            <Row xs={1} md={2} className="g-4">
                {projects.map((project) => (
                    <Col key={project.id}>
                        <ProjectCard
                            project={project}
                            bookmarked={bookmarks.includes(project.id)}
                            onToggleBookmark={toggleBookmark}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProjectsPage;
