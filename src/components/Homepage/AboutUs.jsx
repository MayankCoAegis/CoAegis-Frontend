import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const navigate=useNavigate();
  return (
    <div ref={ref} className=" dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700 py-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Chat Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Floating decorative elements */}
              <motion.div
                animate={isInView ? { y: [-10, 10, -10] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -left-8 w-16 h-16 bg-[#00b1cc] rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={isInView ? { y: [10, -10, 10] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -right-8 w-12 h-12 bg-[#00b1cc] rounded-full opacity-30 blur-lg"
              />
              
              {/* Main illustration container */}
              
                <div className="relative  bg-[url('/aboutUs.png')] bg-cover bg-center w-[90vw] h-[250px] md:w-[500px] md:h-[500px] rounded-2xl p-8 dark:shadow-2xl">
                    
                </div>
             
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-[#00b1cc] font-semibold text-sm uppercase tracking-wider mb-2">
                ABOUT US
              </p>
              <h1 className="text-2xl lg:text-5xl font-semibold leading-tight">
                Empowering Minds with {' '}
                <span className="text-[#00b1cc]">intelligence </span>
                
              </h1>
            </motion.div>

            {/* Content Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm md:text-md leading-relaxed dark:text-[#e5e7eb]/90 text-gray-800/90">
                At CoAegis, we believe that access to knowledge should be effortless, engaging, and empowering. That’s why we’ve built an AI-driven platform that enables users to ask, learn, and grow—whether they’re students, professionals, or lifelong learners. Our AI assistant is designed to provide accurate, context-aware answers across a wide range of topics, helping users make informed decisions, solve problems, and spark creativity.
              </p>

              <p className="text-sm md:text-md leading-relaxed dark:text-[#e5e7eb]/90 text-gray-800/90">
                By bridging the gap between human intelligence and machine learning, we aim to transform the way people connect with information—making it faster, smarter, and more personalized than ever before.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="bg-[#00b1cc] text-white px-8 py-4 rounded-lg font-semibold text-sm md:text-lg hover:bg-[#00b1cc]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Join Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;