// App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Navbar from './Nav.js';
// // import EventManager from './Prhome';
// import HomePage from './Home.js';
// import EventsPage from './pages/EventsPage';
// import CreateEventPage from './pages/CreateEventPage';
// import DashboardPage from './pages/DashboardPage';
// import AboutPage from './pages/AboutPage';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import Adopt from './Adopt';
import LostFound from './LostFound'
import VetDirectory from './Vets';
import Blog from './Blog'
import AboutContactFAQ from './AboutContactFAQ';
import AuthPage from './AuthPage'
import PetDetails from './PetDetails';
import BlogPost from './BlogPost';
import AdminPanel from './AdminPanel';
import Volunteer from './Volunteer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/found-lost" element={<LostFound />} />
        <Route path="/vets" element={<VetDirectory />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutContactFAQ page="about" />} />
        <Route path="/contact" element={<AboutContactFAQ page="contact" />} />
        <Route path="/faq" element={<AboutContactFAQ page="faq" />} />
        <Route path="/donate" element={<AboutContactFAQ page="donate" />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/profile" element={<AdminPanel />} />


        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;