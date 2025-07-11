import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import AboutUs from "../components/Homepage/AboutUs";
import ContactUs from "../components/Homepage/ContactUs";
import CoreValuesSection from "../components/Homepage/CoreValues";
import Landing from "../components/Homepage/Landing";
import Navbar from "../components/Homepage/Navbar";
import Services from "../components/Homepage/Services";
import { useRef } from "react";

export const HomePage=()=> {
    const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const coreValuesRef = useRef(null);

    return <div className="flex flex-col items-center !bg-[#0a0a0a] h-screen w-full">
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
      <footer className="bg-[#0a0a0a] text-[#e5e7eb] py-8 px-6 border-t border-[#1a1a1a] w-full">
        <div className="md:px-20 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            
            <span className="text-2xl font-semibold text-[#e5e7eb]">Co<span className=' text-[#00b1cc] '>Aegis</span></span>
          </div>
          <p className="text-sm">
            © 2025 <span className="text-[#00b1cc]">CoAegis.</span> All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#1a1a1a]">
              <Facebook size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#1a1a1a]">
              <Twitter size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#1a1a1a]">
              <Youtube size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#1a1a1a]">
              <Instagram size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-full border border-[#00b1cc] flex items-center justify-center hover:bg-[#00b1cc] hover:text-white transition"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>

    </div>;
}