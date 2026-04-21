import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
    const { pathname, state } = useLocation();

    useEffect(() => {
        if (state?.scrollTo) return;
        window.scrollTo(0, 0);
    }, [pathname, state]);

    return null;
}

export default ScrollToTop;
