import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container className="text-center">
                <p className="mb-1">
                    Wisconsin Neuromorphic Computing &amp; NeuroAI Lab
                </p>
                <p className="mb-0 footer-subtle">
                    A WIN Organization &middot; CS Department, University of Wisconsin&ndash;Madison
                </p>
            </Container>
        </footer>
    );
}

export default Footer;
