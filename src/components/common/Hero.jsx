import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function Hero({ title, subtitle, primaryCta, secondaryCta }) {
    return (
        <div className="hero">
            <Container className="text-start py-5">
                <h1 className="display-5 fw-bold mb-3">{title}</h1>
                <p className="lead mb-4" style={{ maxWidth: '760px' }}>
                    {subtitle}
                </p>
                {primaryCta && (
                    <Button
                        as={Link}
                        to={primaryCta.to}
                        variant="light"
                        size="lg"
                        className="me-2 fw-semibold"
                    >
                        {primaryCta.label}
                    </Button>
                )}
                {secondaryCta && (
                    <Button
                        as={Link}
                        to={secondaryCta.to}
                        variant="outline-light"
                        size="lg"
                    >
                        {secondaryCta.label}
                    </Button>
                )}
            </Container>
        </div>
    );
}

export default Hero;
