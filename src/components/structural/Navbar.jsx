import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

function Navbar() {
    const location = useLocation();

    return (
        <BsNavbar bg="dark" variant="dark" expand="md" sticky="top">
            <Container>
                <BsNavbar.Brand as={Link} to="/">WNC &amp; NeuroAI Lab</BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="main-nav" />
                <BsNavbar.Collapse id="main-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/projects" active={location.pathname === '/projects'}>
                            Projects
                        </Nav.Link>
                        <Nav.Link as={Link} to="/events" active={location.pathname === '/events'}>
                            Events
                        </Nav.Link>
                        <Nav.Link as={Link} to="/resources" active={location.pathname === '/resources'}>
                            Resources
                        </Nav.Link>
                        <Nav.Link as={Link} to="/mission" active={location.pathname === '/mission'}>
                            Mission
                        </Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
