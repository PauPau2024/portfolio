import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

const contactInfo = [
  { label: 'Email', value: '22b0001@iitb.ac.in', href: 'mailto:22b0001@iitb.ac.in' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sujal-machhale-45426a286',
    href: 'https://linkedin.com/in/sujal-machhale-45426a286',
  },
  {
    label: 'GitHub',
    value: 'github.com/PauPau2024',
    href: 'https://github.com/PauPau2024',
  },
  {
    label: 'Portfolio',
    value: 'sujalmachhale.vercel.app',
    href: 'https://sujalmachhale.vercel.app',
  },
  {
    label: 'Location',
    value: 'Mumbai, India',
    href: null,
  },
];

const Contact = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:22b0001@iitb.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
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
        {'>'} ping sujal
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
        }}
      >
        {/* Contact info */}
        <div>
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  color: '#6e7681',
                  minWidth: '80px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {item.label}:
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: '14px',
                    color: '#c9d1d9',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff41';
                    e.currentTarget.style.textShadow = '0 0 8px #00ff41';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c9d1d9';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {item.value}
                </a>
              ) : (
                <span style={{ fontSize: '14px', color: '#c9d1d9' }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                color: '#6e7681',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {'>'} Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="your_name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                color: '#6e7681',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {'>'} Email
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                color: '#6e7681',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {'>'} Message
            </label>
            <textarea
              className="form-input"
              rows={5}
              placeholder="Enter your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn-terminal">
            [Send Message]
          </button>
        </form>
      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '60px 0 40px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#6e7681', marginBottom: '8px' }}>
          {'>'} Built with React + TypeScript — Sujal Machhale 2026
        </p>
        <p style={{ fontSize: '11px', color: '#444' }}>
          AI Security Researcher | Penetration Tester | IIT Bombay
        </p>
      </footer>
    </section>
  );
};

export default Contact;
