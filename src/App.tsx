import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Contact />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
