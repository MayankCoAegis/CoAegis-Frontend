import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const navigate = useNavigate();

  return (
    <div ref={ref} className=" dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700 py-20 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">

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
                WHAT WE OFFER
              </p>
              <h1 className="text-2xl lg:text-5xl font-semibold leading-tight">
                Navigating the frontier of our{' '}
                <span className="text-[#00b1cc]">intelligence</span>
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
                We offer an intelligent, user-friendly AI assistant that provides instant answers and thoughtful guidance across a wide range of topics. Whether you're looking for help with academic questions, professional tasks, or everyday inquiries, our AI is designed to adapt to your needs with precision and speed. With expertise spanning multiple domains—from technology and science to language, finance, and more.
              </p>

              <p className="text-sm md:text-md leading-relaxed dark:text-[#e5e7eb]/90 text-gray-800/90">
                Our platform ensures you get accurate, context-aware responses anytime. Backed by cutting-edge machine learning models that continuously improve, our AI offers a smarter, more reliable experience every time you interact.
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
                className="bg-[#00b1cc] text-white px-8 py-4 rounded-lg font-semibold text-sm md:text-lg hover:bg-[#00b1cc]/90 transition-all duration-300 shadow-lg hover:shadow-xl "
              >
                Join Now
              </motion.button>
            </motion.div>
          </motion.div>
          {/* Left Side - AI Chat Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
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
               {/* Main illustration container */}
              <div className="hidden md:block relative dark:bg-[#1a1a1a] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700 rounded-2xl p-8 shadow-2xl border dark:border-gray-800 border-gray-200">
                <div className="md:w-80 md:h-80 bg-gradient-to-br from-[#00b1cc]/20 to-[#00b1cc]/5 rounded-xl flex flex-col items-center justify-center space-y-4">
                  
                  {/* AI Chat Interface */}
                  <div className="w-full max-w-xs space-y-3">
                    {/* Chat Header */}
                    <div className="bg-[#00b1cc] rounded-t-lg p-3 flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#00b1cc] rounded-full" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">CoAegis Assistant</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <p className="text-white/80 text-xs">Online</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="dark:bg-[#2a2a2a] bg-[#ffffff] p-4 space-y-3 min-h-[200px] rounded-b-lg">
                      {/* User Message */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="flex justify-end"
                      >
                        <div className="bg-[#00b1cc] text-white px-3 py-2 rounded-lg max-w-[80%] text-sm">
                          Hello! How can you help me today?
                        </div>
                      </motion.div>
                      
                      {/* AI Response */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="flex justify-start"
                      >
                        <div className="bg-[#3a3a3a] text-[#e5e7eb] px-3 py-2 rounded-lg max-w-[80%] text-sm">
                          I'm here to assist you with any questions or tasks you have!
                        </div>
                      </motion.div>
                      
                      {/* Typing Indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 2.4 }}
                        className="flex justify-start"
                      >
                        <div className="bg-[#3a3a3a] px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-[#00b1cc] rounded-full"
                            />
                            <motion.div
                              animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-[#00b1cc] rounded-full"
                            />
                            <motion.div
                              animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-[#00b1cc] rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Connection Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 2, delay: 0.8 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <svg width="300" height="300" className="opacity-20">
                        <motion.path
                          d="M150,100 Q200,150 150,200 Q100,150 150,100"
                          stroke="#00b1cc"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                          animate={isInView ? { strokeDashoffset: [0, -20] } : {}}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            
             
            </div>
          </motion.div>

         
        </div>
      </div>
    </div>
  );
};

export default Services;