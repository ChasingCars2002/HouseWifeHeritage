import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VaultPage from './pages/VaultPage'
import BioPage from './pages/BioPage'
import ChronologyPage from './pages/ChronologyPage'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/housewife/:id" element={<BioPage />} />
          <Route path="/chronology" element={<ChronologyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
