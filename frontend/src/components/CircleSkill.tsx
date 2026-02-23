import { motion } from "framer-motion";

type Props = {
  label: string;
};

const CircleSkill = ({ label }: Props) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.12,
        boxShadow: "0 8px 40px rgba(255, 119, 188, 0.6)",
      }}
      className="
        w-36 h-36
        rounded-full
        bg-[#0b1220]
        text-white
        flex items-center justify-center
        font-playfair
        text-xl font-semibold tracking-wide
        border border-[#1e293b]
        shadow-lg
      "
    >
      {label}
    </motion.div>
  );
};

export default CircleSkill;
