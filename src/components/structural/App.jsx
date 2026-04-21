import { HashRouter, Route, Routes } from 'react-router';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import Footer from '../common/Footer';
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';
import EventsPage from '../pages/EventsPage';
import MissionPage from '../pages/MissionPage';
import ResourcesPage from '../pages/ResourcesPage';

function App() {
    return (
        <HashRouter>
            <ScrollToTop />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/mission" element={<MissionPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                </Routes>
            </main>
            <Footer />
        </HashRouter>
    );
}

export default App;
