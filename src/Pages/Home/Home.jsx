import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowDown,
} from "react-icons/fa";

function Home() {
  return (
    <div className="bg-slate-950 text-white overflow-x-hidden">

      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center justify-center px-6">

        {/* Background Blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[140px] opacity-20"></div>

        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600 rounded-full blur-[140px] opacity-20"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">

          {/* Left */}

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >

            <span className="text-cyan-400 text-xl">
              👋 Hello I'm
            </span>

            <h1 className="text-6xl lg:text-7xl font-black mt-3 leading-tight">
              Roushan
              <br />
              Kumar
            </h1>

            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1800,
                "React Developer",
                1800,
                "Django Developer",
                1800,
                "UI Designer",
                1800,
              ]}
              speed={40}
              repeat={Infinity}
              className="text-3xl text-cyan-400 font-bold mt-5"
            />

            <p className="text-gray-400 leading-8 mt-8 max-w-xl">
              Passionate Full Stack Developer specializing in
              building fast, responsive and scalable web
              applications using React and Tailwind CSS.
            </p>

            <div className="flex gap-5 mt-10">

              <button className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 duration-300 font-semibold">
                Hire Me
              </button>

              <button className="px-8 py-4 rounded-xl border border-cyan-400 hover:bg-cyan-500 duration-300">
                Download CV
              </button>

            </div>

            <div className="flex gap-6 text-3xl mt-10">

              <FaGithub className="hover:text-cyan-400 cursor-pointer duration-300" />

              <FaLinkedin className="hover:text-cyan-400 cursor-pointer duration-300" />

              <FaInstagram className="hover:text-cyan-400 cursor-pointer duration-300" />

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ scale: .6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-cyan-500 blur-3xl opacity-40 animate-pulse"></div>

              <img
                // src="https://i.pravatar.cc/450?img=13"
                alt=""
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_60px_#06b6d4]"
              />

            </div>

          </motion.div>

        </div>

        <div className="absolute bottom-10 animate-bounce text-3xl">
          <FaArrowDown />
        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="text-center text-5xl font-bold"
          >
            About <span className="text-cyan-400">Me</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-20">

            <motion.div
              whileHover={{ scale: 1.05 }}
            >

              <img
                // src="https://i.pravatar.cc/500?img=15"
                alt=""
                className="rounded-3xl"
              />

            </motion.div>

            <motion.div
              initial={{ opacity:0,x:80 }}
              whileInView={{ opacity:1,x:0 }}
              transition={{ duration:1 }}
            >

              <h3 className="text-4xl font-bold">
                Full Stack Developer
              </h3>

              <p className="text-gray-400 leading-8 mt-8">

                I build modern websites and web applications
                using the Full--Stack.

                I enjoy designing attractive user interfaces,
                writing clean code and solving real-world
                problems through technology.

              </p>

              <div className="grid grid-cols-2 gap-6 mt-12">

                <div className="bg-slate-900 rounded-2xl p-8">

                  <h1 className="text-cyan-400 text-5xl font-bold">
                    20+
                  </h1>

                  <p className="mt-2 text-gray-400">
                    Completed Projects
                  </p>

                </div>

                <div className="bg-slate-900 rounded-2xl p-8">

                  <h1 className="text-cyan-400 text-5xl font-bold">
                    1+
                  </h1>

                  <p className="mt-2 text-gray-400">
                    Years Learning
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;