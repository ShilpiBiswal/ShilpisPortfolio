const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/30/4e/55/304e55b9bebd5f10cf05f14eb1bff53b.gif')",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-6">
        <h1 className="font-dancing glitter-text text-9xl md:text-9xl font-semibold mb-6 pb-4">
          Welcome to
          <br />
          Shilpi's Portfolio
        </h1>

        <p className="mt-6 text-gray-200 max-w-xl mx-auto">
          
        </p>

        <button className="font-playfair mt-10 bg-white text-black px-8 py-3 rounded-full text-sm hover:opacity-80 transition"
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }>
          Get in Touch
        </button>
      </div>

    </section>
  );
};

export default Hero;
