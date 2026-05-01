import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/common/Footer';
// import WhatsAppButton from './components/common/WhatsAppButton';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Properties from './pages/Properties';
import ScrollTop from './components/common/ScrollTop';
import Navbarupdate from './components/common/updatenavbar';

export default function App() {
  return (
    <Router>
      <ScrollTop/>
      <div className="min-h-screen flex flex-col">
        <Navbarupdate />
        <main className="flex-grow ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        {/* <WhatsAppButton /> */}
      </div>
    </Router>
  );
}
