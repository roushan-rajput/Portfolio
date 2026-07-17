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

function Home() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const photoRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

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

  // subtle 3D tilt on the photo frame as the mouse moves over it
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

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden cursor-none">
      {/* custom cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_theme(colors.teal.300)] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-9 h-9 rounded-full border border-amber-300/70 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-150 ease-out"
      />

      {/* Particles background */}
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

      {/* Tumhara content particles ke upar */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-14 h-full px-6 lg:px-20">
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

        {/* right: photo placeholder */}
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

            <img
              src={profilePic}
              alt="Roushan Rajput"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

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