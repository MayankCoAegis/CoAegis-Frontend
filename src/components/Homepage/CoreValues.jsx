import { motion } from "framer-motion";
import { Users, Lightbulb, Target } from "lucide-react";

const coreValues = [
  {
    title: "People First",
    icon: <Users className="text-white w-7 h-7" />,
    description:
      "We build with empathy. From developers to end-users, we place people at the center of our technology, ensuring accessibility, safety, and a seamless experience for everyone.",
  },
  {
    title: "Innovation Always",
    icon: <Lightbulb className=" w-7 h-7" />,
    description:
      "Our commitment to innovation drives everything we do. We push boundaries in natural language understanding, machine learning, and intuitive UI design to bring you smarter, faster, and more helpful AI interactions.",
    highlighted: true,
  },
  {
    title: "Mission Driven",
    icon: <Target className="text-white w-7 h-7" />,
    description:
      "Our mission is to democratize knowledge by making intelligent assistance accessible to all. We believe in empowering individuals with AI that enhances human thinking, creativity, and decision-making."
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CoreValuesSection() {
  return (
    <motion.section
      className="dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700 py-20 px-6 w-full" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-[85vw] mx-auto text-center">
        <h4 className="uppercase text-sm tracking-widest text-[#00b1cc] font-semibold mb-3">
          Core Value
        </h4>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-12">
          Unveiling our <span className="text-[#00b1cc] italic">core values</span>
          <br /> for lasting impact.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {coreValues.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className={`rounded-lg p-8 flex flex-col items-center text-center shadow-lg transition-colors duration-300 ${
                value.highlighted
                  ? "bg-[#00b1cc] text-white"
                  : "dark:bg-[#1f1f1f] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700"
              }`}
            >
              <div className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full ${value.highlighted ? "bg-white text-[#00b1cc]" : "bg-[#00b1cc]"}`}>
                {value.icon}
              </div>
              <h3 className=" text-md md:text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
