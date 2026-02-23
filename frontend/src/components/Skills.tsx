import CircleSkill from "./CircleSkill";
import { skills } from "../data/skills";

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-32 px-10 md:px-24 bg-[#0d2149]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <div>
          <h2 className="font-dancing glitter-text text-9xl md:text-9xl font-semibold mb-6">
            Skills
          </h2>

          <p className="font-playfair text-2xl text-white leading-relaxed max-w-md">
            A snapshot of the tools and technologies I’ve worked with while
            building full-stack and AI-driven applications.
          </p>

          <p className="font-playfair text-2xl mt-6 text-white leading-relaxed max-w-md">
            I focus on writing clean, maintainable code and choosing tools
            that best fit the problem at hand.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-4">

            <div className="flex gap-4 justify-center">
              {skills.slice(0, 3).map((s) => (
                <CircleSkill key={s} label={s} />
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              {skills.slice(3, 6).map((s) => (
                <CircleSkill key={s} label={s} />
              ))}
            </div>

   
            <div className="flex gap-4 justify-center">
              {skills.slice(6, 9).map((s) => (
                <CircleSkill key={s} label={s} />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
