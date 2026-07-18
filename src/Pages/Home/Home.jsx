import { useEffect, useRef, useState } from 'react';
import Particles from '../../components/Particles';
// import profilePic from '../../assets/profile-pic.png';
import profilePic from '../../assets/profilepic.png';

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
  { label: 'Backend', items: ['Python', 'Django', 'REST APIs', 'Node.js'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { label: 'Tooling', items: ['Git & GitHub', 'Vercel', 'Docker', 'Postman'] },
];

const PROJECTS = [
  {
    id: '01',
    title: 'Inventory & Billing System',
    description:
      'A Django + React tool for small retailers to track stock, generate invoices, and see sales trends without spreadsheets.',
    stack: ['React', 'Django', 'PostgreSQL', 'Tailwind'],
    live: '#',
    repo: '#',
  },
  {
    id: '02',
    title: 'Realtime Chat App',
    description:
      'WebSocket-based chat with rooms, typing indicators, and message history, built to learn Django Channels properly.',
    stack: ['React', 'Django Channels', 'Redis'],
    live: '#',
    repo: '#',
  },
  {
    id: '03',
    title: 'Job Application Tracker',
    description:
      'A REST API and dashboard for tracking applications, interview stages, and follow-ups, deployed on Vercel.',
    stack: ['React', 'Node.js', 'MongoDB'],
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
    title: 'Fullstack Developer',
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
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ index, title }) {
  return (
    <h2 className="text-zinc-200 font-mono text-sm tracking-wide">
      <span className="text-teal-300">{index}.</span> {title}
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
      className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-transform duration-200 ease-out hover:border-teal-300/60"
    >
      <span className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-teal-300 rounded-tl-lg" />
      <span className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-amber-300 rounded-br-lg" />

      <p className="font-mono text-zinc-600 text-xs">{project.id}</p>
      <h3 className="mt-2 text-zinc-100 text-lg font-semibold">{project.title}</h3>
      <p className="mt-3 text-zinc-400 text-sm leading-relaxed">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="font-mono text-[11px] text-teal-300 border border-teal-300/30 rounded-full px-2.5 py-1"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-4 font-mono text-sm">
        <a href={project.live} className="text-amber-300 hover:underline">
          Live →
        </a>
        <a href={project.repo} className="text-zinc-400 hover:text-zinc-100 hover:underline">
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

  const growCursor = () => ringRef.current?.classList.add('w-14', 'h-14', 'border-teal-300', 'bg-teal-300/10');
  const shrinkCursor = () => ringRef.current?.classList.remove('w-14', 'h-14', 'border-teal-300', 'bg-teal-300/10');

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
    <div className="relative w-full bg-black cursor-none">
      {/* custom cursor — fixed, follows scroll position on its own */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_theme(colors.teal.300)] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-9 h-9 rounded-full border border-amber-300/70 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-150 ease-out"
      />

      {/* sticky top nav for jumping between sections on this single page */}
      <header className="sticky top-0 z-[500] bg-black/70 backdrop-blur-md border-b border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between font-mono text-sm">
          <a href="#top" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="text-teal-300">
            <span className="text-zinc-500">&lt;</span>RK<span className="text-zinc-500">/&gt;</span>
          </a>
          <div className="hidden sm:flex gap-8">
            <a href="#about" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="text-zinc-400 hover:text-amber-300 transition-colors">
              <span className="text-zinc-600">// </span>about
            </a>
            <a href="#skills" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="text-zinc-400 hover:text-amber-300 transition-colors">
              <span className="text-zinc-600">// </span>skills
            </a>
            <a href="#work" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="text-zinc-400 hover:text-amber-300 transition-colors">
              <span className="text-zinc-600">// </span>work
            </a>
            <a href="#contact" onMouseEnter={growCursor} onMouseLeave={shrinkCursor} className="text-zinc-400 hover:text-amber-300 transition-colors">
              <span className="text-zinc-600">// </span>contact
            </a>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section id="top" className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden">
        <div className="absolute inset-0">
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

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-14 min-h-[calc(100vh-64px)] px-6 lg:px-20">
          {/* left: name + role + bio */}
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-zinc-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {typedName}
              {!nameDone && (
                <span className="inline-block w-[3px] h-[0.85em] bg-teal-300 ml-1 align-[-0.08em] animate-pulse" />
              )}
            </h1>

            <p className="mt-3 text-amber-300 font-mono text-sm sm:text-base min-h-[1.4em]">
              <span className="text-zinc-500">// </span>
              {roleText}
              {nameDone && (
                <span className="inline-block w-[2px] h-[1em] bg-amber-300 ml-1 align-middle animate-pulse" />
              )}
            </p>

            <p
              className="mt-6 text-zinc-400 text-[15px] sm:text-base leading-relaxed opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
              style={{ animationDelay: '2.4s' }}
            >
              I build fast, reliable web products end to end — from pixel-perfect interfaces to
              the APIs and databases running behind them. I care about clean code, thoughtful UX
              and shipping things that actually solve real problems. When I&apos;m not coding, I&apos;m
              usually learning something new, breaking something on purpose, or fixing something
              I broke by accident.
            </p>

            <div
              className="mt-8 flex gap-4 justify-center lg:justify-start opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
              style={{ animationDelay: '2.65s' }}
            >
              <a
                href="#work"
                onMouseEnter={growCursor}
                onMouseLeave={shrinkCursor}
                className="px-6 py-3 rounded-lg bg-teal-300 text-black font-semibold font-mono text-sm hover:-translate-y-0.5 transition-transform"
              >
                View Work →
              </a>
              <a
                href="#contact"
                onMouseEnter={growCursor}
                onMouseLeave={shrinkCursor}
                className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-200 font-mono text-sm hover:border-amber-300 hover:text-amber-300 hover:-translate-y-0.5 transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* right: photo */}
          <div className="opacity-0 animate-[fadeUp_0.8s_ease_forwards]" style={{ animationDelay: '0.5s' }}>
            <div
              ref={photoRef}
              onMouseMove={handlePhotoTilt}
              onMouseLeave={() => { resetPhotoTilt(); shrinkCursor(); }}
              onMouseEnter={growCursor}
              className="relative w-[260px] sm:w-[300px] aspect-[3/3.6] rounded-2xl border border-zinc-700 overflow-hidden transition-transform duration-200 ease-out hover:border-teal-300/70"
            >
              <span className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-teal-300 rounded-tl-lg z-10" />
              <span className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-amber-300 rounded-br-lg z-10" />
              <img src={profilePic} alt="Roushan Rajput" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative w-full py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-amber-300 text-sm">
              <span className="text-zinc-500">// </span>about-me
            </p>
            <h2 className="mt-3 text-zinc-100 text-3xl sm:text-4xl font-extrabold tracking-tight">
              The person behind the code
            </h2>
            <p className="mt-6 max-w-2xl text-zinc-400 text-[15px] sm:text-base leading-relaxed">
              I&apos;m Roushan — a fullstack developer who likes taking an idea from a blank file
              to something people actually use. I split my time between React on the frontend
              and Python/Django on the backend, with a habit of poking at the database layer
              until queries stop being embarrassing.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <div className="relative pl-6 border-l border-zinc-800">
              {TIMELINE.map((entry) => (
                <div key={entry.title} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-teal-300 shadow-[0_0_10px_theme(colors.teal.300)]" />
                  <p className="font-mono text-amber-300 text-xs">{entry.year}</p>
                  <h3 className="mt-1 text-zinc-100 font-semibold">{entry.title}</h3>
                  <p className="text-zinc-500 text-sm font-mono">{entry.org}</p>
                  <p className="mt-2 text-zinc-400 text-sm leading-relaxed max-w-xl">{entry.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="relative w-full py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeading index="01" title="Skills" />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <div
                  onMouseEnter={growCursor}
                  onMouseLeave={shrinkCursor}
                  className="relative rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-teal-300/60 transition-colors"
                >
                  <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-teal-300 rounded-tl-lg" />
                  <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-300 rounded-br-lg" />
                  <h3 className="text-zinc-100 font-semibold text-sm">{group.label}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-zinc-400 text-sm font-mono">
                        <span className="text-amber-300">›</span> {item}
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
      <section id="work" className="relative w-full py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeading index="02" title="Selected work" />
            <p className="mt-4 max-w-2xl text-zinc-400 text-[15px] sm:text-base leading-relaxed">
              A handful of projects that mattered enough to finish and polish.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} growCursor={growCursor} shrinkCursor={shrinkCursor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative w-full py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14">
          <Reveal>
            <p className="font-mono text-amber-300 text-sm">
              <span className="text-zinc-500">// </span>get-in-touch
            </p>
            <h2 className="mt-3 text-zinc-100 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s build something
            </h2>
            <p className="mt-6 max-w-md text-zinc-400 text-[15px] sm:text-base leading-relaxed">
              Have a project, a role, or just an idea worth talking through? My inbox is open —
              I usually reply within a day or two.
            </p>

            <ul className="mt-10 space-y-4">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    onMouseEnter={growCursor}
                    onMouseLeave={shrinkCursor}
                    className="group flex items-baseline gap-3 font-mono text-sm"
                  >
                    <span className="text-teal-300 w-20 shrink-0">{social.label}</span>
                    <span className="text-zinc-500 group-hover:text-amber-300 transition-colors">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleFormSubmit}
              className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 space-y-5"
            >
              <span className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-teal-300 rounded-tl-lg" />
              <span className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-amber-300 rounded-br-lg" />

              <div>
                <label htmlFor="name" className="block font-mono text-xs text-zinc-500 mb-2">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-teal-300 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs text-zinc-500 mb-2">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-teal-300 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-zinc-500 mb-2">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  placeholder="What are you building?"
                  className="w-full bg-black/60 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-teal-300 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={growCursor}
                onMouseLeave={shrinkCursor}
                className="w-full px-6 py-3 rounded-lg bg-teal-300 text-black font-semibold font-mono text-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>

              {status === 'sent' && (
                <p className="font-mono text-teal-300 text-xs text-center">
                  Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="font-mono text-red-400 text-xs text-center">
                  Something went wrong — try again or email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-zinc-900 py-8 text-center font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} Roushan Kumar — built with React & Tailwind
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;
