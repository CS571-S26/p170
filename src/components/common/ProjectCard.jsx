import { Card, Badge, Button } from 'react-bootstrap';

function ProjectCard({ project, bookmarked, onToggleBookmark }) {
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <div className="mb-3 mt-auto">
                    {project.tags.map((tag) => (
                        <Badge key={tag} bg="secondary" className="me-1">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Button
                    variant={bookmarked ? 'dark' : 'outline-dark'}
                    size="sm"
                    onClick={() => onToggleBookmark(project.id)}
                >
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;
