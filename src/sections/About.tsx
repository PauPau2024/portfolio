import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

interface CounterProps {
  end: number;
  decimals?: number;
  suffix?: string;
  triggered: boolean;
}

const Counter = ({ end, decimals = 0, suffix = '', triggered }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * end).toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [triggered, end, decimals]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 23, label: 'Confirmed Vulnerabilities', suffix: '' },
  { value: 9.0, label: 'Highest CVSS Score', suffix: '', decimals: 1 },
  { value: 2, label: 'SIEM Stacks Deployed', suffix: '' },
  { value: 1, label: 'Critical Netflix Bug', suffix: '' },
];

const About = () => {
  const sectionRef = useScrollReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersTriggered, setCountersTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
        {'>'} cat about.txt
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ color: '#c9d1d9', marginBottom: '20px', lineHeight: 1.8 }}>
            Cybersecurity and QA professional with hands-on experience in penetration testing,
            vulnerability assessment, and test automation. Skilled in web application security
            (OWASP Top 10, Burp Suite), SIEM deployment (ELK Stack, Prometheus, Grafana, Loki),
            and mobile/web test automation (Appium, Selenium, PyTest). Experienced in AI and LLM
            security testing including prompt injection, indirect prompt injection, and adversarial
            ML testing.
          </p>
          <p style={{ color: '#c9d1d9', lineHeight: 1.8 }}>
            IIT Bombay student with proven bug bounty results on HackerOne including a Critical
            severity (CVSS 9.0) finding — an OTP brute-force Account Takeover chain discovered
            by an AI agent I built.
          </p>
        </div>

        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '20px',
                border: '1px solid rgba(0, 255, 65, 0.15)',
                background: 'rgba(0, 255, 65, 0.02)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 255, 65, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="stat-number">
                <Counter
                  end={stat.value}
                  decimals={stat.decimals || 0}
                  triggered={countersTriggered}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />
    </section>
  );
};

export default About;
