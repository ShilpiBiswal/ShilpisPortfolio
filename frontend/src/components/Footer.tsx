import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0b1220] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div>
          <h3 className="font-playfair text-2xl font-semibold mb-4">Get in Touch</h3>

          <div className="flex gap-4">
            <a
              href="https://github.com/ShilpiBiswal"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/shilpi-biswal-83b971318/"
              target="_blank"
              rel="noreferrer" 
              className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:biswalshilpi@gmail.com"
              className="w-11 h-11 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <form className="bg-white/60 text-black rounded-2xl p-6 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Your email"
            required
            className="px-4 py-2 rounded-full border focus:outline-none"
          />

          <textarea
            placeholder="Your message"
            rows={2}
            required
            className="px-4 py-2 rounded-xl border resize-none focus:outline-none"
          />

          <button
            type="submit"
            className="self-end px-6 py-2 rounded-full bg-black text-white hover:opacity-90"
          >
            Send
          </button>
        </form>

      </div>

      <p className="font-playfair mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Shilpi Biswal
      </p>
    </footer>
  );
};

export default Footer;
