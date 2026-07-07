import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import Hvideo1 from "../../assets/Hvideo1.mp4"
import Udaipur from "../../assets/Udaipur.mp4"
import fh from "../../assets/fh.mp4"
import b from "../../assets/b.mp4"
import r from "../../assets/r.mp4"
import v from "../../assets/v.mp4"
import logo from '../../assets/Palace.png';


export default function Home() {
  return (
    <div className="w-full">
      <header
        className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20"
        aria-label="Main navigation header"
      >
        <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
          <img
            src={logo}
            alt="Logo"
            className="sm-logo-img block h-55 w-55 object-contain"
            draggable={false}
            width={110}
            height={24}
          />
        </div>
      </header>
      {/* HERO SECTION WITH VIDEO */}
      <section className="relative min-h-screen overflow-hidden">

        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={Hvideo1}
          autoPlay
          loop
          muted
          playsInline
        />

      

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 text-white flex flex-col items-center justify-center min-h-screen"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Experience Royal Living
          </h1>
          <p className="text-lg mb-8">

            A Heritage Palace Hotel
          </p>

          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Book your Stay!!
          </Link>
        </motion.div>
      </section>



      {/*------------------------------------------------FEATURED HOTELS --------------------------------------------------------*/}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Palace
        </h2>
        <div className="flex gap-6 justify-center mt-10">

          {/* CARD 1 */}
          <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:scale-105 hover:shadow-2xl relative transition duration-300">
            <NavLink to="/Signup"><div>
              <video
                className="absolute bottom-20 left-0 h-full  object-cover"
                src={fh}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>



              <div className="p-4 relative top-[190px] z-10">
                <h2 className="text-xl font-bold">Peaceful Stay</h2>
                <p className="text-gray-600">Manali</p>
                
              </div>
            </NavLink>

          </div>

          {/* CARD 2 */}
          <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:scale-105 hover:shadow-2xl transition duration-300 relative">
            <NavLink to="/Signup">
              <video
                className="absolute bottom-20 left-0 h-full  object-cover"
                src={r}
                autoPlay
                loop
                muted
                playsInline
              />

              <div className="p-4 relative top-[190px] z-10">
                <h2 className="text-xl font-bold">Sea View Resort</h2>
                <p className="text-gray-600">Goa</p>
                
              </div>
            </NavLink>
          </div>

          {/* CARD 3 */}
          <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:scale-105 hover:shadow-2xl transition duration-300 relative">
            <NavLink to="/Signup">
              <div>
                <video
                  className="absolute bottom-20 left-0 h-full  object-cover"
                  src={b}
                  autoPlay
                  loop
                  muted
                  playsInline
                /></div>
              <div className="p-4 relative top-[190px] z-10">
                <h2 className="text-xl font-bold">Grand  Banquet</h2>
                <p className="text-gray-600">Dehradun</p>

              </div>
            </NavLink>
          </div>


          {/* CARD 4 */}
          <NavLink to="/Signup">
            <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:scale-105 hover:shadow-2xl transition duration-300">

              <video
                src={v}
                className="w-full h-44 object-cover"
                autoPlay
                loop
                muted
                playsInline>

              </video>
              <div className="p-4">
                <h2 className="text-xl font-bold">Let's Go On Trip</h2>
                <p className="text-gray-600"><select name="City" id=" " ></select></p>

              </div>
            </div>
          </NavLink>
        </div>
      </section >



      {/* ================= LUXURY EXPERIENCE ================= */}
      < section className="py-20 bg-white" >
        <div className="max-w-10xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* <motion.video */}
          <div>
            <video
              className="w-full h-full rounded-2xl shadow-lg object-cover"
              src={Udaipur}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              A Royal Experience Awaits You
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Every Palace is designed to reflect royalty, elegance and comfort.
              From hand-picked interiors to world-class service, we take care of
              every little detail.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether it's a vacation, honeymoon or business stay — Palace
              promises unforgettable memories.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Palace Hotels began with a vision to redefine luxury hospitality.
              From a single property to multiple iconic destinations, our journey
              has been driven by passion, dedication, and trust of our guests.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every corner of our hotels is designed to reflect elegance, comfort,
              and unforgettable experiences.
            </p>
          </motion.div>

        </div>
      </section >



      <section className="relative bg-[#0f0e0c] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#c9a24d] tracking-widest uppercase mb-4">
              Royal Palace Hotel
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
              Not Just a Stay, <br />
              A Royal Way of Life
            </h2>

            <p className="text-gray-300 max-w-lg mb-10">
              Step into a heritage palace where centuries of royal history,
              grand architecture and modern luxury come together to offer
              an unforgettable stay.
            </p>

            <div className="flex gap-6">
              <button className="bg-[#c9a24d] text-black px-8 py-3 tracking-wide hover:bg-[#b08d3c] transition">
                Book Your Stay
              </button>

              <button className="border border-[#c9a24d] text-[#c9a24d] px-8 py-3 hover:bg-[#c9a24d] hover:text-black transition">
                Explore Palace
              </button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <video src={Udaipur} autoPlay loop muted playsInline className="w-full h-full rounded-2xl shadow-lg object-cover" />
            {/* GOLD FRAME */}
            <div className="absolute inset-0 border border-[#c9a24d] translate-x-4 translate-y-4 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>







    </div >
  )

}