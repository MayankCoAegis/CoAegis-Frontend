import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const [message, setMessage] = useState("");
  const [prompts] = useState([
    {
      text: "Write a to-do list for a personal project or task",
      icon: "ri-user-line",
    },
    {
      text: "Generate an email to reply to a job offer",
      icon: "ri-mail-line",
    },
    {
      text: "Summarise this article or text for me in one paragraph",
      icon: "ri-chat-2-line",
    },
    {
      text: "How does AI work in a technical capacity",
      icon: "ri-sliders-line",
    },
  ]);

  

  const handleSend = () => {
    if (message.trim() === "") return;
    console.log("Sending message:", message);
    // Add your send logic here
    setMessage(""); // Clear input after sending
  };
  return (
    <div className="md:static flex flex-col items-center justify-center md:h-full p-4 md:p-0 md:m-0 w-full gap-2">
      <div className="text-center px-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <i class="ri-wechat-channels-line text-4xl text-white"></i>
        </div>

        {/* Heading */}
        <h1 className="text-white text-xl md:text-3xl font-medium text-shadow-lg">
          Welcome to <span className="text-cyan-500">CoAegis</span>
        </h1>

        {/* Subtext */}
        <p className="text-zinc-500 mt-2 text-sm md:max-w-xl mx-auto">
          Introducing CoAegis — an advanced AI built to challenge
          assumptions, generate fearless ideas, and help you think beyond the
          obvious.Fast. Bold. Unfiltered.
        </p>
      </div>

      {/* Sample Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 px-0 max-w-4xl mx-auto md:mt-8">
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className="bg-[#121212] text-white p-4 rounded-xl shadow-lg border border-gray-800 hover:border-cyan-500 cursor-pointer transition"
          >
            <p className="text-sm mb-4 text-zinc-400">{prompt.text}</p>
            <i className={`${prompt.icon} text-xl text-gray-400`}></i>
          </div>
        ))}
      </div>

        {/* Helper div for mobile view */}
        <div className="md:hidden bg-neutral-900 fixed bottom-0 w-[calc(100%-2rem)] p-3"></div>
      {/* Input Box */}
      <div className="fixed bottom-0 w-[calc(100%-2rem)] p-3 mb-4 md:static bg-[#0e0e0e] rounded-xl md:p-4 md:w-full max-w-4xl mx-auto shadow-lg border border-gray-800">
        {/* Input area */}
        <textarea
          rows={1}
          placeholder="Ask Anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent resize-none text-gray-200 placeholder-zinc-500 outline-none p-2 text-sm"
        ></textarea>

        {/* Bottom Bar with Send Button */}
        <div className="flex justify-between mt-2 items-center">

          <div className="flex flex-1 items-center justify-start gap-4 text-white text-lg md:p-2">
            {/* Plus Icon */}
            <i className="ri-add-line cursor-pointer hover:text-cyan-400 transition"></i>

            {/* Mic Icon */}
            {/* <i className="ri-mic-line cursor-pointer hover:text-cyan-400 transition"></i> */}
          </div>

          <button
            onClick={handleSend}
            className="hidden md:block flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-gray-200 text-sm font-medium px-4 py-1.5 rounded-md transition"
          >
            {/* <i className="ri-send-plane-fill"></i> */}
            
            Send
          </button>
          <button
            onClick={handleSend}
            className="md:hidden flex items-center gap-2 text-gray-200 text-sm font-medium p-2 px-1.5 rounded-full transition"
          >
            {/* <i className="ri-send-plane-fill"></i> */}
            
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
