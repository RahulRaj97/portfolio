import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-earth-50 via-warm-50 to-forest-50">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
