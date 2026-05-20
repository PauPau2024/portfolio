import useScrollReveal from '@/hooks/useScrollReveal';

const Education = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="education"
      ref={sectionRef}
      className="scroll-reveal"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '100px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '18px',
          color: '#00ff41',
          marginBottom: '40px',
          fontWeight: 500,
          letterSpacing: '1px',
        }}
      >
        {'>'} cat education.txt
      </h2>

      <div
        className="exp-card"
        style={{
          maxWidth: '700px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#6e7681' }}>[INSTITUTION] </span>
          <span style={{ fontSize: '15px', color: '#e6edf3', fontWeight: 500 }}>
            Indian Institute of Technology, Bombay
          </span>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#6e7681' }}>[DEGREE] </span>
          <span style={{ fontSize: '14px', color: '#c9d1d9' }}>
            B.Tech — Aerospace Engineering
          </span>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#6e7681' }}>[PERIOD] </span>
          <span style={{ fontSize: '14px', color: '#c9d1d9' }}>Sep 2022 -- Sep 2026</span>
        </div>

      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />
    </section>
  );
};

export default Education;
