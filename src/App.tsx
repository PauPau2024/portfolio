import MatrixRain from '@/components/MatrixRain';
import Navbar from '@/components/Navbar';
import AITerminal from '@/components/AITerminal';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import Education from '@/sections/Education';
import Contact from '@/sections/Contact';

function App() {
  return (
    <div
      style={{
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Matrix rain background - fixed behind everything */}
      <MatrixRain />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* AI Prompt Injection Terminal - fixed bottom-right */}
      <AITerminal />
    </div>
  );
}

export default App;
