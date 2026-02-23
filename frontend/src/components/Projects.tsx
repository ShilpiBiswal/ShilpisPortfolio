import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-15 px-10 md:px-24 bg-[#0d2149]">
      <h2 className="font-dancing glitter-text text-8xl md:text-9xl font-semibold mb-20 text-center pb-4">
        Projects
      </h2>

      <div className="space-y-20">
        {projects.map((project, i) => {
          const reverse = i % 2 !== 0;

          return (
            <div
              key={project.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
            
              <div className={`${reverse ? "md:order-2" : ""}`}>
                <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: "0 8px 40px rgba(255, 119, 188, 0.6)" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

              <div className={`${reverse ? "md:order-1" : ""}`}>
                <h3 className="font-playfair text-3xl font-semibold mb-4 text-white">
                  {project.title}
                </h3>

                <p className="font-playfair text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-playfair px-3 py-1 text-sm rounded-full bg-white/60 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
