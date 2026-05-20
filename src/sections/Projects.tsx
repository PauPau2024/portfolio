import useScrollReveal from '@/hooks/useScrollReveal';

interface Project {
  name: string;
  date: string;
  tags: string[];
  description: string;
  github?: string;
  featured?: boolean;
  badge?: string;
}

const projects: Project[] = [
  {
    name: 'AI-Driven Bug Bounty Security Automation Framework',
    date: 'Apr 2026 -- May 2026',
    tags: ['Python', 'Go', 'Bash', 'AI', 'HackerOne', 'CVSS 3.1', 'CLAUDE.md'],
    description:
      'AI agent orchestrated via CLAUDE.md running a 6-phase recon-to-report loop. Autonomously discovered 23 confirmed vulnerabilities on HackerOne including a Critical (CVSS 9.0) OTP brute-force ATO chain. Toolchain includes a 30-worker Go JS secret extractor, 11 Python hunt modules, CVSS 3.1 scorer, and report generator.',
    github: 'https://github.com/PauPau2024/security-automation',
    featured: true,
    badge: 'CRITICAL FIND',
  },
  {
    name: 'ELK Stack SIEM Deployment',
    date: 'Jun 2025 -- Aug 2025',
    tags: ['Elasticsearch', 'Logstash', 'Kibana', 'Filebeat', 'Ubuntu', 'UFW'],
    description:
      'Full ELK Stack on Ubuntu Server for centralized log ingestion, parsing, indexing, and real-time analytics. Automated log pipelines with custom Logstash filters and Kibana keystore encryption.',
    github: 'https://github.com/PauPau2024/Elasticsearch-Logstash-and-Kibana_Stack_SIEM_Deployment',
  },
  {
    name: 'Prometheus, Grafana & Loki SIEM Stack',
    date: 'Jun 2025 -- Aug 2025',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Docker', 'PromQL', 'LogQL'],
    description:
      'Observability and SIEM stack via Docker for Node.js and Linux servers. Centralized log aggregation with Promtail and security compliance alerting queries.',
    github: 'https://github.com/PauPau2024/Grafana-Prometheus-and-Loki_SIEM_Deployment',
  },
  {
    name: 'Android & iOS QA Automation — AWS Device Farm',
    date: 'Mar 2025 -- Jun 2025',
    tags: ['Appium', 'PyTest', 'Python', 'AWS Device Farm', 'iOS', 'Android'],
    description:
      'Automated multi-device mobile testing pipeline with parallel execution across iOS and Android. Centralized HTML, JUnit, and PyTest reporting with automated artifact capture.',
    github: 'https://github.com/PauPau2024/ARGenie_Automation_IOS_Testing',
  },
  {
    name: 'Transparent SSL Proxy & Web Security Lab',
    date: 'Feb 2025 -- Mar 2025',
    tags: ['SSL', 'HTTPS', 'XSS', 'CSRF', 'Apache2', 'MySQL', 'SSO'],
    description:
      'Transparent SSL proxy intercepting encrypted HTTPS traffic for live security research. Validated XSS and CSRF exploits on a custom web application with SSO and client-side certificate enforcement.',
  },
  {
    name: 'n8n Automated Research & AI Pipeline',
    date: 'Mar 2026 -- Apr 2026',
    tags: ['n8n', 'Python', 'NVIDIA LLM API', 'Web Scraping', 'Automation'],
    description:
      'n8n workflow converting user queries into optimized searches, scraping live web content, and piping structured results into an NVIDIA LLM for AI-assisted analysis.',
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className={`project-card ${project.featured ? 'project-featured' : ''}`}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#e6edf3',
              margin: 0,
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {project.name}
          </h3>
        </div>

        <div
          style={{
            fontSize: '11px',
            color: '#6e7681',
            marginBottom: '16px',
          }}
        >
          {project.date}
        </div>

        {project.badge && (
          <div
            style={{
              display: 'inline-block',
              background: '#ff3131',
              color: '#000',
              fontSize: '9px',
              fontWeight: 700,
              padding: '2px 8px',
              marginBottom: '12px',
              letterSpacing: '1px',
            }}
          >
            {project.badge}
          </div>
        )}

        <p
          style={{
            fontSize: '13px',
            color: '#c9d1d9',
            lineHeight: 1.7,
            marginBottom: '20px',
          }}
        >
          {project.description}
        </p>

        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.github && (
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: '#00ff41',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 8px #00ff41';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            [GitHub &rarr;]
          </a>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const sectionRef = useScrollReveal();

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
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
        {'>'} ls -la projects/
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Featured project - full width */}
        {featuredProject && (
          <div style={{ width: '100%' }}>
            <ProjectCard project={featuredProject} />
          </div>
        )}

        {/* Regular projects - 3 column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {regularProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>

      <hr className="section-divider" style={{ marginTop: '100px' }} />
    </section>
  );
};

export default Projects;
