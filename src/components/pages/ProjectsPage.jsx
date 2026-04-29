import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Form } from 'react-bootstrap';
import ProjectCard from '../common/ProjectCard';
import imgNeuronSim from '../../assets/project-neuron-sim.svg';
import imgDreamAi from '../../assets/project-dream-ai.svg';
import imgSnnEdge from '../../assets/project-snn-edge.svg';
import imgMemristive from '../../assets/project-memristive.svg';

const projects = [
    {
        id: 'neuron-sim',
        title: 'Digital Neuron Simulation',
        description:
            'A Python-based simulation of biological neurons using the Hodgkin-Huxley and leaky integrate-and-fire models. Members build and visualize spiking behavior to understand the computational primitives of the brain.',
        details:
            'Using Brian2 and NumPy, members implement single-neuron and small-network dynamics, plot membrane voltage traces, and explore how parameter choices affect firing patterns. The project doubles as an onramp for members new to computational neuroscience.',
        tags: ['Python', 'Neuroscience', 'Simulation'],
        image: imgNeuronSim,
        imageAlt:
            'Plot of a neuron membrane voltage trace showing two action potentials rising sharply above the firing threshold, in UW red on a cream background.',
    },
    {
        id: 'dream-ai',
        title: 'Dream-Inspired AI',
        description:
            'An exploration of generative models that mimic aspects of human dreaming. The project investigates how replay and recombination during offline processing can improve learning in neural networks.',
        details:
            'We train small generative models, then periodically pause training to run "dream" passes that recombine latent features. Members measure whether these offline phases improve downstream generalization on classification benchmarks.',
        tags: ['Generative Models', 'Deep Learning', 'Creativity'],
        image: imgDreamAi,
        imageAlt:
            'Dreamlike scene with a glowing orb above wavy luminous trails over a dark purple-to-red gradient, evoking offline replay in a generative model.',
    },
    {
        id: 'snn-edge',
        title: 'Spiking Neural Networks for Edge Computing',
        description:
            'Developing energy-efficient SNN implementations targeting neuromorphic hardware platforms for real-time sensor processing at the edge.',
        details:
            'Using snnTorch and Norse, the team benchmarks spiking models against conventional ANNs on keyword spotting and gesture recognition, with a focus on latency and inference energy.',
        tags: ['SNN', 'Hardware', 'Edge Computing'],
        image: imgSnnEdge,
        imageAlt:
            'Schematic of a chip with red traces and labeled pins, with an incoming spike train above and arrows indicating spike inputs and outputs.',
    },
    {
        id: 'memristive-learning',
        title: 'Memristive Crossbar Learning',
        description:
            'Investigating spike-timing-dependent plasticity (STDP) learning rules that can be mapped to memristive crossbar arrays for on-chip learning.',
        details:
            'Members simulate crossbar devices with realistic nonidealities, then evaluate STDP variants for robustness. The long-term goal is a design that tolerates device variability while still learning meaningful representations.',
        tags: ['STDP', 'Memristors', 'Hardware'],
        image: imgMemristive,
        imageAlt:
            'A 7-by-5 grid of horizontal and vertical wires forming a crossbar array, with red dots of varying intensity at each intersection representing memristive devices at different conductance levels.',
    },
];

function ProjectsPage() {
    const [showBookmarked, setShowBookmarked] = useState(false);
    const [selectedTag, setSelectedTag] = useState('All');
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('wnc-bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wnc-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    function toggleBookmark(id) {
        setBookmarks((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    }

    const allTags = useMemo(
        () => ['All', ...new Set(projects.flatMap((p) => p.tags))],
        []
    );

    const visible = projects.filter(
        (p) =>
            (!showBookmarked || bookmarks.includes(p.id)) &&
            (selectedTag === 'All' || p.tags.includes(selectedTag))
    );

    return (
        <Container className="py-5 text-start">
            <h1>Projects</h1>
            <p className="lead mb-4">
                Our members collaborate on hands-on projects that span neuron modeling,
                generative AI, and neuromorphic hardware. Filter by tag, bookmark your
                favorites (saved across visits), and expand a card for more detail.
            </p>

            <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
                <ButtonGroup>
                    <Button
                        variant={showBookmarked ? 'outline-danger' : 'danger'}
                        onClick={() => setShowBookmarked(false)}
                    >
                        All Projects
                    </Button>
                    <Button
                        variant={showBookmarked ? 'danger' : 'outline-danger'}
                        onClick={() => setShowBookmarked(true)}
                    >
                        Bookmarked ({bookmarks.length})
                    </Button>
                </ButtonGroup>

                <Form.Select
                    style={{ maxWidth: '240px' }}
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    aria-label="Filter projects by tag"
                >
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag === 'All' ? 'All tags' : tag}
                        </option>
                    ))}
                </Form.Select>

                {selectedTag !== 'All' && (
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0"
                        onClick={() => setSelectedTag('All')}
                    >
                        Clear tag filter
                    </Button>
                )}
            </div>

            {visible.length === 0 ? (
                <p className="text-muted fst-italic">
                    No projects match your current filters.
                </p>
            ) : (
                <Row xs={1} md={2} className="g-4">
                    {visible.map((project) => (
                        <Col key={project.id}>
                            <ProjectCard
                                project={project}
                                bookmarked={bookmarks.includes(project.id)}
                                onToggleBookmark={toggleBookmark}
                                onTagClick={setSelectedTag}
                                activeTag={selectedTag}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ProjectsPage;
