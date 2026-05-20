import useScrollReveal from '@/hooks/useScrollReveal';

interface ExperienceEntry {
  job: string;
  org: string;
  date: string;
  bullets: string[];
}

const experiences: ExperienceEntry[] = [
  {
    job: 'Cyber Security & Quality Assurance Intern',
    org: 'AR Genie | Remote',
    date: 'May 2025 -- Aug 2025',
    bullets: [
      'Built Python automation scripts for Android and iOS application testing via Appium on AWS Device Farm.',
      'Designed SOC 2 Type I compliance readiness plan with TSC-aligned technical controls and risk mitigation.',
      'Authored PromQL and LogQL alerting rules in Prometheus-Grafana-Loki SIEM stack for real-time threat detection.',
    ],
  },
  {
    job: 'Independent Bug Bounty Researcher',
    org: 'HackerOne Platform | Responsible Disclosure',
    date: 'Apr 2023 -- May 2023',
    bullets: [
      'Discovered IDOR (Insecure Direct Object Reference) in Netflix unsubscribe flow — unauthorized email removal without authentication.',
      'Submitted via Netflix responsible disclosure on HackerOne; finding triaged by Netflix security team.',
    ],
  },
];

const Experience = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="experience"
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
        {'>'} cat experience.log
      </h2>

      <div>
        {experiences.map((exp, idx) => (
          <div key={idx} className="exp-card">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
                gap: '8px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#6e7681', marginBottom: '4px' }}>
                  [JOB]
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#e6edf3' }}>
                  {exp.job}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', color: '#00ff41' }}>{exp.date}</div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#6e7681' }}>[ORG] </span>
              <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{exp.org}</span>
            </div>

            <div style={{ fontSize: '12px', color: '#6e7681', marginBottom: '8px' }}>
              [DATE] {exp.date}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0' }}>
              {exp.bullets.map((bullet, bidx) => (
                <li
                  key={bidx}
                  style={{
                    color: '#c9d1d9',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    paddingLeft: '16px',
                    position: 'relative',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: '#00ff41',
                    }}
                  >
                    {'>'}
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />
    </section>
  );
};

export default Experience;
