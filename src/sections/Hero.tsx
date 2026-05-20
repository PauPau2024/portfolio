import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [nameRevealed, setNameRevealed] = useState(false);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const fullText = 'AI Security | Penetration Testing | Quality Assurance';

  useEffect(() => {
    // Name reveal animation
    const nameTimer = setTimeout(() => {
      setNameRevealed(true);
    }, 300);

    return () => clearTimeout(nameTimer);
  }, []);

  useEffect(() => {
    if (!nameRevealed) return;

    // Typewriter effect for tagline
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [nameRevealed]);

  useEffect(() => {
    // Blinking cursor
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              color: '#00ff41',
              fontSize: '14px',
              opacity: nameRevealed ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            {'>'} whoami
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 700,
            color: '#e6edf3',
            margin: '0 0 20px 0',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            opacity: nameRevealed ? 1 : 0,
            transform: nameRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          Sujal Machhale
          <span
            style={{
              color: '#00ff41',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s',
              fontWeight: 300,
              marginLeft: '4px',
            }}
          >
            |
          </span>
        </h1>

        <p
          ref={taglineRef}
          style={{
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: '#c9d1d9',
            margin: '0 0 12px 0',
            minHeight: '28px',
            letterSpacing: '0.5px',
          }}
        >
          {displayText}
          {displayText.length < fullText.length && (
            <span
              style={{
                color: '#00ff41',
                opacity: showCursor ? 1 : 0,
              }}
            >
              |
            </span>
          )}
        </p>

        <p
          style={{
            fontSize: '14px',
            color: '#6e7681',
            margin: '0 0 40px 0',
            opacity: nameRevealed ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        >
          IIT Bombay — Aerospace Engineering '26
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            opacity: nameRevealed ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          <button onClick={handleScrollToProjects} className="btn-terminal">
            [View Projects]
          </button>
          <a
            href="https://drive.google.com/file/d/1wxDL3u_O92cEErVIHGvQJOWy6Yg0P_eO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal"
            style={{ textDecoration: 'none' }}
          >
            [Download Resume]
          </a>
          <a
            href="https://github.com/PauPau2024"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal"
            style={{ textDecoration: 'none' }}
          >
            [GitHub]
          </a>
        </div>
      </div>

      {/* Scroll down arrow */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 1s ease 1.5s forwards',
          opacity: 0,
          cursor: 'pointer',
        }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontSize: '11px', color: '#6e7681', letterSpacing: '2px' }}>SCROLL</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00ff41"
          strokeWidth="2"
          style={{ animation: 'fadeInUp 2s ease infinite' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
