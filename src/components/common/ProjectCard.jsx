import { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

function ProjectCard({ project, bookmarked, onToggleBookmark, onTagClick, activeTag }) {
    const [open, setOpen] = useState(false);

    return (
        <Card className="h-100 project-card">
            <Card.Body className="d-flex flex-column">
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Collapse in={open}>
                    <div>
                        <p className="text-muted small mb-3">{project.details}</p>
                    </div>
                </Collapse>
                <div className="mb-3 mt-auto">
                    {project.tags.map((tag) => (
                        <Badge
                            key={tag}
                            bg={activeTag === tag ? 'danger' : 'secondary'}
                            className="me-1 project-tag"
                            onClick={() => onTagClick?.(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="d-flex gap-2 flex-wrap">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                    >
                        {open ? 'Hide details' : 'Learn more'}
                    </Button>
                    <Button
                        variant={bookmarked ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={() => onToggleBookmark(project.id)}
                    >
                        {bookmarked ? '\u2605 Bookmarked' : '\u2606 Bookmark'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;
