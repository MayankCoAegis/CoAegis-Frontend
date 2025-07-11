import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const orbVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden w-full"
      style={{
        background:
          "linear-gradient(to bottom right, #0a0a0a, #0a0a0a, #0a0a0a)",
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 rounded-full"
        style={{ backgroundColor: "#00b1cc" }}
        variants={orbVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-32 w-6 h-6 rounded-full"
        style={{ backgroundColor: "#00b1cc", opacity: 0.8 }}
        variants={orbVariants}
        animate="animate"
        // style={{ animationDelay: '1s' }}
      />
      <motion.div
        className="absolute bottom-40 left-32 w-3 h-3 rounded-full"
        style={{ backgroundColor: "#00b1cc", opacity: 0.6 }}
        variants={orbVariants}
        animate="animate"
        // style={{ animationDelay: '2s' }}
      />

      {/* Large Decorative Circle */}
      <motion.div
        className="absolute top-32 left-1/4 w-24 h-24 border-2 rounded-full"
        style={{ borderColor: "#00b1cc", opacity: 0.3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Curved Cyan Shape */}
      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-1/2"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          className="w-full h-full rounded-tr-full opacity-20"
          style={{
            background: `linear-gradient(to top right, #00b1cc, transparent)`,
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Animation Element - Behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full backdrop-blur-sm border -z-10"
          style={{
            background: `linear-gradient(to bottom right, rgba(0, 177, 204, 0.2), rgba(0, 177, 204, 0.1))`,
            borderColor: "rgba(0, 177, 204, 0.3)",
          }}
          variants={floatingVariants}
          animate="animate"
        />

        {/* Header Badge */}
        <motion.div
          className="flex items-center gap-2 mb-8 px-4 py-2 backdrop-blur-sm rounded-full border"
          style={{
            backgroundColor: "rgba(0, 177, 204, 0.1)",
            borderColor: "rgba(0, 177, 204, 0.3)",
          }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium" style={{ color: "#00b1cc" }}>
            Effortless communication
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-semibold mb-6 max-w-5xl"
          variants={itemVariants}
        >
          <span className="text-white">Intelligent </span>
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, #00b1cc, #00b1cc)`,
            }}
          >
            chat assistance
          </span>
          <br />
          <span className="text-white">for your business</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-sm md:text-md mb-12 max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          Explore limitless knowledge through intelligent chat. From simple
          queries to complex ideas—just ask.
        </motion.p>

        {/* Email Form */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
            style={{
              background: `linear-gradient(to right, #00b1cc, #00a8b8)`,
              "--tw-ring-color": "#00b1cc",
              "--tw-ring-offset-color": "#0a0a0a",
            }}
            onClick={() => navigate("/chat")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 177, 204, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.span
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-md"
            >
              Chat Now
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Features */}
        {/* <motion.div
          className="flex flex-col sm:flex-row gap-6 mt-8 text-sm"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Free 1 month trial</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Free No credit card required</span>
          </motion.div>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Landing;
