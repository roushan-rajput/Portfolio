import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import react from "../../assets/react.svg"



export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full bg-black text-white">

        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-bold">
              Roushan Kumar
            </h1>

            <h2 className="text-3xl text-yellow-400 mt-4">
              Full Stack Developer
            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-gray-400">
              I build modern web applications using React,
              Django, and other cutting-edge technologies. My focus is on creating responsive, user-friendly interfaces and scalable backend systems that deliver exceptional performance.
            </p>

            <div className="mt-10 flex justify-center gap-5">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full">
                View Projects
              </button>

              <button className="border px-8 py-3 rounded-full">
                Download Resume
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="py-32 max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-10">
            About Me
          </h2>

          <p className="text-gray-400 text-lg leading-9">
            I'm a passionate Full Stack Developer focused on
            creating beautiful, scalable and high-performance
            web applications.
          </p>
        </section>

        {/* SKILLS */}
        <section className="py-24 bg-zinc-900">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-5xl font-bold text-center mb-16">
              Tech Stack
            </h2>

            <div className="grid md:grid-cols-4 gap-8">

              {[  
                "HTML",                                                        
                "CSS",                                                        
                "JavaScript",                                                        
                "React",                                                        
                "Tailwind CSS",                                                                                                                
                "React",                                                        
                "javascript",
                "MySQL",
                "Python",
                "Django",
                "JWT Authentication",
                "Tailwind",
                "CRUD Operations",
                "Postman",
                "Rest API",
                "Git",
                "GitHub",
                "Vercel",

              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-black p-8 rounded-2xl text-center hover:scale-105 transition"
                >
                  {skill}
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-5xl font-bold text-center mb-16">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-10">

              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <div className="h-60 bg-zinc-800"></div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    Hotel Booking Platform
                  </h3>

                  <p className="text-gray-400 mt-3">
                    React + Node + MongoDB
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <div className="h-60 bg-zinc-800"></div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    E-Commerce Store
                  </h3>

                  <p className="text-gray-400 mt-3">
                    MERN Stack Project
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <div className="h-60 bg-zinc-800"></div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    AI SaaS Dashboard
                  </h3>

                  <p className="text-gray-400 mt-3">
                    Next.js + OpenAI
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-32 bg-yellow-400 text-black">

          <div className="text-center">

            <h2 className="text-6xl font-bold">
              Let's Work Together
            </h2>

            <p className="mt-6 text-xl">
              Available for freelance and full-time opportunities.
            </p>

            <button className="bg-black text-white px-10 py-4 rounded-full mt-8">
              Contact Me
            </button>

          </div>

        </section>

      </div>







    </div >
  )

}