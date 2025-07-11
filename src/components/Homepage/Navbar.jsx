import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onAboutClick, onServicesClick, onContactClick, onCoreValuesClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate=useNavigate();

  const navItems = [
    { name: 'Chat Now', hasDropdown: false ,onClickFunction: () => navigate('/chat') },
    { name: 'About', hasDropdown: false , onClickFunction: onAboutClick },
    
    { name: 'Services', hasDropdown: false , onClickFunction: onServicesClick },
    
    { name: 'Contact', hasDropdown: false , onClickFunction: onContactClick },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0, 177, 204, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <nav className="bg-[#0a0a0a] sticky top-0 z-90 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            variants={logoVariants}
            whileHover="hover"
          >
            
            <span className="text-2xl font-semibold text-[#e5e7eb]">Co<span className=' text-[#00b1cc] '>Aegis</span></span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={item.onClickFunction}
              >
                <motion.button
                  className="flex items-center space-x-1 text-[#e5e7eb] hover:text-[#00b1cc] transition-colors duration-200 py-2 px-3 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <motion.svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: hoveredItem === item.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  )}
                </motion.button>
                
                {/* Hover underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00b1cc]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right side - Language, Login, Join */}
          <div className="hidden md:flex items-center space-x-4">
           

            <motion.button
              className="text-[#e5e7eb] hover:text-[#00b1cc] transition-colors duration-200 py-2 px-4 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>

            <motion.button
              className="bg-[#00b1cc] text-white px-6 py-2 rounded-md font-medium "
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/register')}
            >
              Register
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-[#e5e7eb]"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#0a0a0a] border-t border-gray-800"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="block"
                  onClick={item.onClickFunction}
                >
                  <motion.button
                    className="flex items-center justify-between w-full text-[#e5e7eb] hover:text-[#00b1cc] transition-colors duration-200 py-3 px-4 rounded-md hover:bg-gray-800"
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </motion.button>
                </motion.div>
              ))}
              
              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-gray-800 space-y-2"
              >
                
                
                <motion.button
                  className="text-[#e5e7eb] hover:text-[#00b1cc] transition-colors duration-200 py-3 px-4 rounded-md font-medium hover:bg-gray-800 w-full text-left"
                  whileHover={{ x: 5 }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </motion.button>
                
                <motion.button
                  className="bg-[#00b1cc] text-white px-4 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-200 w-full"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate('/register')}
                >
                  Join now
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;