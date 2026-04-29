import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Properties from './pages/Properties';
import ScrollTop from './components/common/ScrollTop';

export default function App() {
  return (
    <Router>
      <ScrollTop/>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
