import { useEffect, useState } from "react";

const images = [
  "https://i.pinimg.com/1200x/8a/20/ee/8a20ee518b41cee0f0533186f7900a19.jpg",
  "https://i.pinimg.com/736x/2c/21/48/2c2148dcf3994155e12dccb0152fc9a7.jpg",
  "https://i.pinimg.com/736x/fa/4e/dc/fa4edc4bdec82b8e49e92756d695b039.jpg",
  "https://i.pinimg.com/736x/80/60/de/8060dee8f47e8135267f27194c2780af.jpg",
  "https://i.pinimg.com/736x/0f/d9/54/0fd9541225162740c5dc4d63e2bdc860.jpg",
];

const About = () => {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
    });
  }, []);
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <section id="about" className="py-32 px-10 md:px-24 bg-[#0d2149]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

     
        <div>
          <h2 className="font-dancing glitter-text text-9xl font-bold">
            About Me
          </h2>

          <p className="font-playfair mt-6 text-black-400 leading-relaxed max-w-md text-white"> I’m a final year Computer Science Engineering student at Symbiosis Institute Of Technology  who enjoys turning ideas into thoughtful, user-focused software. I like working at the intersection of logic and creativity by building applications that feel intuitive and purposeful. </p> 
          <p className="font-playfair mt-6 text-black-400 leading-relaxed max-w-md text-white"> I enjoy collaborating with teams, exploring new technologies, and continuously improving my craft through hands-on projects. </p>
        </div>

        
<div className="relative flex items-center justify-center">
  <div className="relative w-full max-w-[620px] max-h-[400px]">
    
   
    <div className="relative bg-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-700"
      style={{ background:"#FF77BC", boxShadow: "0 0 0 1px #374151, 0 25px 50px rgba(0,0,0,0.6)" }}
    >
     
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>

     
      <div className="relative h-[280px] rounded-lg overflow-hidden bg-black">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>

    <div className="mx-auto w-16 h-6 bg-[#FF77BC] rounded-b-sm" />
    <div className="mx-auto w-32 h-3 bg-[#ff0081] rounded-full" />
  </div>
</div>

      </div>
    </section>
  );
};

export default About;
