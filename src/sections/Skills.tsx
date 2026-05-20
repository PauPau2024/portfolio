import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Penetration Testing & Vuln Assessment',
    skills: [
      'Burp Suite', 'Nmap', 'Nuclei', 'Kali Linux',
      'OWASP Top 10', 'XSS', 'SQLi', 'SSRF', 'IDOR',
      'CSRF', 'Auth Bypass', 'CVSS 3.1',
    ],
  },
  {
    category: 'AI & LLM Security',
    skills: [
      'Prompt Injection', 'Indirect Prompt Injection',
      'Adversarial ML Testing', 'LLM API Security', 'AI Red Teaming',
    ],
  },
  {
    category: 'Bug Bounty & Security Research',
    skills: [
      'HackerOne', 'Responsible Disclosure',
      'PoC Development', 'Vulnerability Triage', 'Report Writing',
    ],
  },
  {
    category: 'SIEM & Monitoring',
    skills: [
      'Prometheus', 'Grafana', 'Loki', 'Promtail',
      'PromQL', 'LogQL', 'Elasticsearch', 'Logstash', 'Kibana', 'Filebeat',
    ],
  },
  {
    category: 'QA & Test Automation',
    skills: [
      'Selenium WebDriver', 'Appium', 'PyTest', 'Postman',
      'AWS Device Farm', 'JIRA', 'Manual Testing', 'Regression Testing',
    ],
  },
  {
    category: 'Security Automation & DevOps',
    skills: [
      'Python', 'Go', 'Bash', 'Docker', 'CI/CD',
      'Git', 'GitHub', 'Linux', 'AWS', 'API Security',
    ],
  },
  {
    category: 'Certifications',
    skills: [
      'IBM Cybersecurity Analyst',
      'Security Operations Center (SOC) Analyst',
    ],
  },
];

interface TopSkill {
  name: string;
  level: number;
}

const topSkills: TopSkill[] = [
  { name: 'Burp Suite', level: 95 },
  { name: 'Python', level: 92 },
  { name: 'Appium', level: 88 },
  { name: 'Prometheus', level: 85 },
  { name: 'LLM Security', level: 82 },
];

const Skills = () => {
  const sectionRef = useScrollReveal();
  const skillBarsRef = useRef<HTMLDivElement>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (skillBarsRef.current) {
      observer.observe(skillBarsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
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
        {'>'} cat skills.json
      </h2>

      {/* JSON-style skills display */}
      <div className="json-block" style={{ marginBottom: '60px' }}>
        <div style={{ color: '#00ff41' }}>{'{'}</div>
        {skillCategories.map((cat, idx) => (
          <div key={idx} style={{ marginLeft: '24px', marginBottom: '12px' }}>
            <span className="json-key">"{cat.category}"</span>
            <span style={{ color: '#6e7681' }}>: </span>
            <span style={{ color: '#00ff41' }}>[</span>
            <div style={{ marginLeft: '24px' }}>
              {cat.skills.map((skill, sidx) => (
                <span key={sidx}>
                  <span className="json-string">"{skill}"</span>
                  {sidx < cat.skills.length - 1 && (
                    <span style={{ color: '#6e7681' }}>, </span>
                  )}
                  {(sidx + 1) % 4 === 0 && sidx < cat.skills.length - 1 && <br />}
                </span>
              ))}
            </div>
            <span style={{ color: '#00ff41' }}>]</span>
            {idx < skillCategories.length - 1 && (
              <span style={{ color: '#6e7681' }}>,</span>
            )}
          </div>
        ))}
        <div style={{ color: '#00ff41' }}>{'}'}</div>
      </div>

      {/* Animated skill bars */}
      <h3
        style={{
          fontSize: '14px',
          color: '#6e7681',
          marginBottom: '32px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        {'>'} Proficiency Levels
      </h3>

      <div ref={skillBarsRef} style={{ maxWidth: '600px' }}>
        {topSkills.map((skill, idx) => (
          <div key={idx} style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{skill.name}</span>
              <span style={{ fontSize: '12px', color: '#00ff41' }}>{skill.level}%</span>
            </div>
            <div className="skill-bar-container">
              <div
                className={`skill-bar-fill ${barsAnimated ? 'animate' : ''}`}
                style={
                  {
                    '--skill-level': `${skill.level}%`,
                    width: barsAnimated ? `${skill.level}%` : '0%',
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />
    </section>
  );
};

export default Skills;
