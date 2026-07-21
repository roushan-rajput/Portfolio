import { useEffect, useRef, useState } from 'react';
import Particles from '../../components/Particles';
import profilePic from '../../assets/profilepic.png';
import './Home.css';

const ROLES = [
  'Fullstack Developer',
  'React & Javascript',
  'Python & Django',
  'API & Database Design',
  'Github & Vercel',
];

const NAME = 'Roushan Kumar';

const SKILL_GROUPS = [
  { label: 'Frontend', items: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 / CSS3'] },
  { label: 'Backend', items: ['Python', 'Django', 'REST APIs'] },
  { label: 'Data', items: ['MySQL'] },
  { label: 'Tooling', items: ['Git & GitHub', 'Vercel', 'Postman'] },
];

const PROJECTS = [
  {
    id: '01',
    title: 'Corporate Management System',
    description:
      'A Django + React tool for managing the corporate system and on the level of each departments.',
    stack: ['React', 'Django', 'Tailwind','sql'],
    live: '#',
    repo: '#',
  },
  {
    id: '02',
    title: 'Olx Pro',
    description:
      'A Django + React tool for small retailers to track stock, generate invoices, and see sales trends without spreadsheets',
    stack: ['React', 'Django Channels'],
    live: '#',
    repo: '#',
  },
  {
    id: '03',
    title: 'PALACE-A Hotel Booking Website',
    description:
      'A  deployed on Vercel.',
    stack: ['React', 'JSON','Tailwind','Vercel'],
    live: '#',
    repo: '#',
  },
  {
    id: '04',
    title: 'Portfolio Site (this one)',
    description:
      'A particle background, custom cursor, and a typewriter hero, built to actually feel finished.',
    stack: ['React', 'Tailwind', 'Vite'],
    live: '#',
    repo: '#',
  },
];

const TIMELINE = [
  {
    year: '2024 — Present',
    title: 'Fullstack Development',
    org: 'Freelance / Self-directed projects',
    detail:
      'Designing and shipping complete products — React frontends wired to Django APIs, deployed on Vercel with real users in mind.',
  },
  {
    year: '2023',
    title: 'API & Database Design',
    org: 'Independent study & project work',
    detail:
      'Went deep on relational schema design, query performance, and building REST APIs that are actually pleasant to consume.',
  },
  {
    year: '2022',
    title: 'Started building for the web',
    org: 'First lines of code',
    detail:
      'Picked up HTML, CSS and JavaScript, then kept going — every project since has been an excuse to learn one more thing properly.',
  },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/', handle: '@roushankumar' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', handle: '/in/roushankumar' },
  { label: 'Email', href: 'mailto:hello@example.com', handle: 'hello@example.com' },
];

// types out `text` once, letter by letter, after `delay` ms
function useTypewriter(text, delay = 0, speed = 10) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return { typed, done };
}

// endlessly types + deletes through a list of roles, once `active` is true


function useRoleCycler(roles, active) {
  const [roleText, setRoleText] = useState('');

  useEffect(() => {
    if (!active) return undefined;

    let mounted = true;
    let r = 0;
    let c = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      if (!mounted) return;
      const current = roles[r];

      if (!deleting) {
        c++; 
        setRoleText(current.slice(0, c));
        if (c === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
      } else {
        c--;
        setRoleText(current.slice(0, c));
        if (c === 0) {
          deleting = false;
          r = (r + 1) % roles.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 35 : 60);
    };

    timeoutId = setTimeout(tick, 60);
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [roles, active]);

  return roleText;
}

// fade-up-on-scroll wrapper reused by every section below the hero
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ index, title }) {
  return (
    <h2 className="section-heading">
      <span className="index">{index}.</span> {title}
    </h2>
  );
}

function ProjectCard({ project, growCursor, shrinkCursor }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 6, y: -py * 6 });
  };
  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    shrinkCursor();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={growCursor}
      style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
      className="project-card"
    >
      <span className="corner-tl" />
      <span className="corner-br" />

      <p className="project-id">{project.id}</p>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <ul className="project-stack">
        {project.stack.map((tech) => (
          <li key={tech} className="project-tag">
            {tech}
          </li>
        ))}
      </ul>

      <div className="project-links">
        <a href={project.live} className="link-live">
          Live →
        </a>
        <a href={project.repo} className="link-code">
          Code →
        </a>
      </div>
    </div>
  );
}

function Home() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const photoRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const { typed: typedName, done: nameDone } = useTypewriter(NAME, 900, 85);
  const roleText = useRoleCycler(ROLES, nameDone);

  // custom cursor: dot follows instantly, ring eases in behind it
  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMove);

    let raf;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const growCursor = () => ringRef.current?.classList.add('is-active');
  const shrinkCursor = () => ringRef.current?.classList.remove('is-active');

  // subtle 3D tilt on the hero photo frame as the mouse moves over it
  const handlePhotoTilt = (e) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
  };
  const resetPhotoTilt = () => {
    if (photoRef.current) photoRef.current.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      // wire this up to your backend / form endpoint of choice
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="page">
      {/* custom cursor — fixed, follows scroll position on its own */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* sticky top nav for jumping between sections on this single page */}
      <header className="site-header">
        <nav className="nav">
          <a href="#top" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="nav-logo">
            <span className="bracket">&lt;</span>RK<span className="bracket">/&gt;</span>
          </a>
          <div className="nav-links">
            <a href="#about" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="nav-link">
              <span className="prefix">// </span>about
            </a>
            <a href="#skills" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="nav-link">
              <span className="prefix">// </span>skills
            </a>
            <a href="#work" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="nav-link">
              <span className="prefix">// </span>work
            </a>
            <a href="#contact" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="nav-link">
              <span className="prefix">// </span>contact
            </a>
          </div>
        </nav>
      </header>
      

      {/* ================= HERO ================= */}
      <section id="top" className="hero">
        <div className="hero-particles">
          <Particles
            particleColors={['#ffffff', '#3b82f6', '#a855f7']}
            particleCount={200}
            particleSpread={10}
            speed={0.10}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
          />
        </div>

        <div className="hero-content">
          {/* left: name + role + bio */}
          <div className="hero-text">
            <h1 className="hero-name">
              {typedName}
              {!nameDone && <span className="blink-caret-teal" />}
            </h1>

            <p className="hero-role">
              <span className="prefix">// </span>
              {roleText}
              {nameDone && <span className="blink-caret-amber" />}
            </p>

            <p className="hero-bio">
              | Full stack Developer | Python | Django | React.js | MySQL | Restful API | JWT | CRUD | API Integration | Oops Concepts
            </p>

            <div className="hero-actions">
              <a href="#work" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="btn-primary">
                View Work →
              </a>
              <a href="#contact" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          {/* right: photo */}
          <div className="hero-photo-wrap">
            <div
              ref={photoRef}
              onMouseMove={handlePhotoTilt}
              onMouseLeave={() => { resetPhotoTilt(); shrinkCursor(); }}
              onMouseEnter={growCursor}
              className="hero-photo"
            >
              <span className="corner-tl" />
              <span className="corner-br" />
              <img src={profilePic} alt="Roushan Rajput" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="section">
        <div className="section-inner">
          <Reveal>
            <p className="eyebrow">
              <span className="prefix">// </span>about-me
            </p>
            <h2 className="section-title">The person behind the code</h2>
            <p className="section-desc">
              I&apos;m Roushan — a fullstack developer who likes taking an idea from a blank file
              to something people actually use. I split my time between React on the frontend
              and Python/Django on the backend, with a habit of poking at the database layer
              until queries stop being embarrassing.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="timeline">
              {TIMELINE.map((entry) => (
                <div key={entry.title} className="timeline-item">
                  <span className="timeline-dot" />
                  <p className="timeline-year">{entry.year}</p>
                  <h3 className="timeline-title">{entry.title}</h3>
                  <p className="timeline-org">{entry.org}</p>
                  <p className="timeline-detail">{entry.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="section">
        <div className="section-inner">
          <Reveal>
            <SectionHeading index="01" title="Skills" />
          </Reveal>
          <div className="skills-grid">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <div onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="skill-card">
                  <span className="corner-tl small" />
                  <span className="corner-br small" />
                  <h3 className="skill-card-title">{group.label}</h3>
                  <ul className="skill-list">
                    {group.items.map((item) => (
                      <li key={item} className="skill-item">
                        <span className="arrow">›</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="work" className="section">
        <div className="section-inner">
          <Reveal>
            <SectionHeading index="02" title="Selected work" />
            <p className="section-desc">
              A handful of projects that mattered enough to finish and polish.
            </p>
          </Reveal>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} growCursor={growCursor} shrinkCursor={shrinkCursor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="section">
        <div className="section-inner contact-grid">
          <Reveal>
            <p className="eyebrow">
              <span className="prefix">// </span>get-in-touch
            </p>
            <h2 className="section-title">Let&apos;s build something</h2>
            <p className="contact-desc">
              Have a project, a role, or just an idea worth talking through? My inbox is open —
              I usually reply within a day or two.
            </p>

            <ul className="social-list">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    onMouseEnter={growCursor}
                    onMouseLeave={shrinkCursor}
                    className="social-link"
                  >
                    <span className="social-label">{social.label}</span>
                    <span className="social-handle">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleFormSubmit} className="contact-form">
              <span className="corner-tl" />
              <span className="corner-br" />

              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  type="text"
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  placeholder="What are you building?"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={growCursor}
                onMouseLeave={shrinkCursor}
                className="submit-btn"
              >
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>

              {status === 'sent' && (
                <p className="form-status success">
                  Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status error">
                  Something went wrong — try again or email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="site-footer">
        © {new Date().getFullYear()} Roushan Kumar — built with React & Tailwind
      </footer>
    </div>
  );
}

export default Home;
