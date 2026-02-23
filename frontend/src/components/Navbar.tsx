const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-[#FF77BC]">
      <span className="font-playfair text-white text-2xl font-semibold">Shilpi Biswal</span>

      <div className="font-playfair text-white flex gap-6 text-lg">
        {["About", "Projects", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() =>
              document
                .getElementById(item.toLowerCase())
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:opacity-70 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
