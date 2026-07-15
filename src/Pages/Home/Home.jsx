import { motion, useScroll, useSpring } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import react from "../../assets/react.svg"

/* ------------------------------------------------------------------ */
/*  DATA — apni images yahan daalo. Bas path replace karo,             */
/*  UI khud handle kar lega (agar image na mile to fallback dikhega). */
/* ------------------------------------------------------------------ */

const skills = [
  { name: "HTML", image: "/images/skills/html.png" },
  { name: "CSS", image: "/images/skills/css.png" },
  { name: "JavaScript", image: "/images/skills/js.png" },
  { name: "React", image: "/images/skills/react.png" },
  { name: "Tailwind CSS", image: "/images/skills/tailwind.png" },
  { name: "MySQL", image: "/images/skills/mysql.png" },
  { name: "Python", image: "/images/skills/python.png" },
  { name: "Django", image: "/images/skills/django.png" },
  { name: "JWT Authentication", image: "/images/skills/jwt.png" },
  { name: "CRUD Operations", image: "/images/skills/crud.png" },
  { name: "Postman", image: "/images/skills/postman.png" },
  { name: "REST API", image: "/images/skills/restapi.png" },
  { name: "Git", image: "/images/skills/git.png" },
  { name: "GitHub", image: "/images/skills/github.png" },
  { name: "Vercel", image: "/images/skills/vercel.png" },
]

const projects = [
  {
    title: "Hotel Booking Platform",
    stack: "React + Node + MongoDB",
    image: "/images/projects/hotel-booking.png",
  },
  {
    title: "E-Commerce Store",
    stack: "MERN Stack Project",
    image: "/images/projects/ecommerce.png",
  },
  {
    title: "AI SaaS Dashboard",
    stack: "Next.js + OpenAI",
    image: "/images/projects/ai-dashboard.png",
  },
]

const education = [
  {
    degree: "B.Tech / B.E. (Computer Science)",
    institute: "Apna College / University Name",
    year: "20XX — 20XX",
    image: "/images/education/college.png",
  },
  {
    degree: "Intermediate (12th)",
    institute: "Apna School Name",
    year: "20XX — 20XX",
    image: "/images/education/school12.png",
  },
  {
    degree: "Matriculation (10th)",
    institute: "Apna School Name",
    year: "20XX — 20XX",
    image: "/images/education/school10.png",
  },
]

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Issuing Platform (Udemy / Coursera / etc.)",
    image: "/images/certificates/fullstack.png",
  },
  {
    title: "Python & Django Certification",
    issuer: "Issuing Platform",
    image: "/images/certificates/django.png",
  },
  {
    title: "React JS Certification",
    issuer: "Issuing Platform",
    image: "/images/certificates/react.png",
  },
]

const activities = [
  {
    title: "Coding Club — Core Member",
    desc: "College coding club me events aur workshops organize kiye.",
    image: "/images/activities/coding-club.png",
  },
  {
    title: "Hackathon Participant",
    desc: "College/State level hackathons me team ke saath participate kiya.",
    image: "/images/activities/hackathon.png",
  },
  {
    title: "Volunteer Work",
    desc: "College fest / NGO event me volunteer ke roop me kaam kiya.",
    image: "/images/activities/volunteer.png",
  },
]

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/* ------------------------------------------------------------------ */
/*  BACKGROUND LAYERS — grid + floating glow blobs, sits behind        */
/*  everything and shows through every section since sections are      */
/*  transparent / semi-transparent instead of flat colors.             */
/* ------------------------------------------------------------------ */

function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-yellow-190">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,204,21,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />

      {/* floating glow blobs */}
      <motion.div
        className="absolute w-[38rem] h-[38rem] rounded-full bg-yellow-400/20 blur-[120px]"
        style={{ top: "-10%", left: "-10%" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[32rem] h-[32rem] rounded-full bg-amber-500/10 blur-[110px]"
        style={{ bottom: "-10%", right: "-5%" }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[24rem] h-[24rem] rounded-full bg-yellow-300/10 blur-[100px]"
        style={{ top: "40%", left: "50%" }}
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle vignette so edges stay deep black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_85%)]" />
    </div>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 z-50"
    />
  )
}

/* ------------------------------------------------------------------ */
/*  REUSABLE PIECES                                                   */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="text-center mb-16"
    >
      {eyebrow && (
        <span className="text-yellow-400 tracking-[0.3em] text-xs font-semibold uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mt-3 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full mx-auto mt-6" />
    </motion.div>
  )
}

function ImageBox({ src, alt, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-800/60 flex items-center justify-center ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none"
          e.currentTarget.nextSibling.style.display = "flex"
        }}
        className="w-full h-full object-cover"
      />
      <div className="hidden absolute inset-0 items-center justify-center text-zinc-500 text-xs uppercase tracking-widest text-center px-2">
        {alt}
      </div>
    </div>
  )
}

/* glassmorphism card wrapper with a glowing gradient border on hover */
function GlowCard({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-yellow-400/40 transition-colors overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(250,204,21,0.12),transparent_60%)]" />
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" })

  const handleHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlight({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    })
  }

  const marqueeSkills = [...skills, ...skills]

  return (
    <div className="w-full text-white">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>

      <AmbientBackground />
      <ScrollProgressBar />

      <div className="w-full">
        {/* HERO */}
        <section
          onMouseMove={handleHeroMove}
          className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 transition-[background] duration-300"
            style={{
              background: `radial-gradient(600px circle at ${spotlight.x} ${spotlight.y}, rgba(250,204,21,0.10), transparent 60%)`,
            }}
          />

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-300 text-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Available for freelance & full-time work
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent"
            >
              Roushan Kumar
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl text-yellow-400 mt-4"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto mt-6 text-gray-400"
            >
              I build modern web applications using React, Django, and other
              cutting-edge technologies. My focus is on creating responsive,
              user-friendly interfaces and scalable backend systems that
              deliver exceptional performance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex justify-center gap-5 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250,204,21,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium"
              >
                View Projects
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#facc15" }}
                whileTap={{ scale: 0.95 }}
                className="border border-zinc-700 px-8 py-3 rounded-full font-medium backdrop-blur-sm"
              >
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </section>

        {/* ABOUT */}
        <section className="py-28 max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Introduction" title="About Me" />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-gray-400 text-lg leading-9 max-w-4xl mx-auto text-center"
          >
            I'm a passionate Full Stack Developer focused on creating
            beautiful, scalable and high-performance web applications.
          </motion.p>
        </section>

        {/* SKILLS */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading eyebrow="What I Work With" title="Tech Stack" />
          </div>

          {/* marquee strip */}
          <div className="relative w-full overflow-hidden mb-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-4">
              {marqueeSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-zinc-300 whitespace-nowrap"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {skills.map((skill) => (
                <GlowCard key={skill.name} className="p-6 flex flex-col items-center gap-4 text-center">
                  <ImageBox
                    src={skill.image}
                    alt={skill.name}
                    className="w-14 h-14 rounded-xl"
                  />
                  <span className="text-sm md:text-base">{skill.name}</span>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="py-28">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeading eyebrow="Academic Background" title="Education" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative border-l border-white/10 ml-4"
            >
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative pl-10 pb-14 last:pb-0"
                >
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />

                  <GlowCard className="flex flex-col sm:flex-row gap-6 p-6">
                    <ImageBox
                      src={edu.image}
                      alt={edu.institute}
                      className="w-full sm:w-32 h-32 rounded-xl flex-shrink-0"
                    />

                    <div>
                      <span className="text-yellow-400 text-sm font-semibold">
                        {edu.year}
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-400 mt-2">{edu.institute}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading eyebrow="Recognitions" title="Certificates" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {certificates.map((cert, i) => (
                <GlowCard key={i}>
                  <ImageBox src={cert.image} alt={cert.title} className="h-48 w-full" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <p className="text-gray-400 mt-2 text-sm">{cert.issuer}</p>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* EXTRA CURRICULAR ACTIVITIES */}
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              eyebrow="Beyond Academics"
              title="Extra Curricular Activities"
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {activities.map((act, i) => (
                <GlowCard key={i}>
                  <ImageBox src={act.image} alt={act.title} className="h-48 w-full" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{act.title}</h3>
                    <p className="text-gray-400 mt-2 text-sm">{act.desc}</p>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading eyebrow="Selected Work" title="Featured Projects" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-10"
            >
              {projects.map((project, i) => (
                <GlowCard key={i} className="group">
                  <ImageBox
                    src={project.image}
                    alt={project.title}
                    className="h-60 w-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-gray-400 mt-3">{project.stack}</p>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative py-28 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500" />
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(black_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative text-center text-black px-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              Let's Work Together
            </h2>

            <p className="mt-6 text-xl">
              Available for freelance and full-time opportunities.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-10 py-4 rounded-full mt-8 font-medium"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
