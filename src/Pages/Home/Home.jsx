import Particles from '../../components/Particles';


function Home() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
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
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-zinc-300 text-4xl font-bold">Roushan Rajput</h1>
      </div>
    </div>
  );
}

export default Home;