import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import AboutUs from "../components/Homepage/AboutUs";
import ContactUs from "../components/Homepage/ContactUs";
import CoreValuesSection from "../components/Homepage/CoreValues";
import Landing from "../components/Homepage/Landing";
import Navbar from "../components/Homepage/Navbar";
import Services from "../components/Homepage/Services";
import { useRef, useState } from "react";
import HomepagePass from "../components/HomePagePass";
import { useTheme } from "../contexts/ThemeContext";

export const HomePage=()=> {
    const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const coreValuesRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  const {theme,toggleTheme}=useTheme();

    return <>
      <HomepagePass isOpen={isOpen} onClose={onClose}/>
     {!isOpen &&<div className="flex flex-col items-center dark:bg-[#0a0a0a] bg-[#ffffff] h-screen w-full">
        <Navbar onAboutClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
        onServicesClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
        onContactClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
        onCoreValuesClick={() => coreValuesRef.current?.scrollIntoView({ behavior: "smooth" })}/>
        <Landing/>
        <div className="w-full" ref={aboutRef}><AboutUs /></div>
      <div className="w-full" ref={coreValuesRef}><CoreValuesSection /></div>
      <div className="w-full" ref={servicesRef}><Services /></div>
      <div className="w-full" ref={contactRef}><ContactUs /></div>

        {/* Footer */}
      <footer className="dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#e5e7eb] text-gray-700 py-8 px-6 border-t dark:border-[#1a1a1a] border-[#e5e7eb] w-full">
        <div className="md:px-20 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            
            <span className="text-2xl font-semibold dark:text-[#e5e7eb] text-gray-700">Co<span className=' dark:text-[#00b1cc] text-cyan-500'>Aegis</span></span>
          </div>
          <p className="text-sm">
            © 2025 <span className="text-[#00b1cc]">CoAegis.</span> All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center dark:hover:bg-[#1a1a1a] hover:bg-cyan-400 transition hover:scale-110">
              <Facebook size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center dark:hover:bg-[#1a1a1a] hover:bg-cyan-400 transition hover:scale-110">
              <Twitter size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center dark:hover:bg-[#1a1a1a] hover:bg-cyan-400 transition hover:scale-110">
              <Youtube size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center dark:hover:bg-[#1a1a1a] hover:bg-cyan-400 transition hover:scale-110">
              <Instagram size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-full border border-[#00b1cc] flex items-center justify-center hover:bg-[#00b1cc] hover:text-white transition transition hover:scale-110"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>

    </div>}
    </>
}