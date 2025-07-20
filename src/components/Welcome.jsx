import { useEffect, useRef, useState } from "react";

import { getChatResponse } from "../api/chat";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChatContext } from "../pages/ChatLayout";

export default function Welcome() {
  const [message, setMessage] = useState("");
  const [prompts] = useState([
    {
      text: "Show me vendors with proven expertise in NLP for customer service automation",
      icon: "ri-user-line",
    },
    {
      text: "Filter vendors based on successful project deployments in the insurance industry with measurable ROI",
      icon: "ri-mail-line",
    },
    {
      text: "Identify vendors offering solutions that integrate with ERP",
      icon: "ri-chat-2-line",
    },
    {
      text: "Identify vendors with a strong track record of delivering projects on time and within budget",
      icon: "ri-question-line",
    },
  ]);
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState([]);
  const bottomRef = useRef(null);
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const navigate = useNavigate();
  const { chatHistory, setChatHistory, setNewChatHistory, setIsnewChat } =
    useContext(ChatContext);

  const handleSend = async ({ prompt = "" }) => {
    setGeneratingResponse(true);
    setShowChat(true);
    let userText = "";
    if (prompt.length > 0) {
      userText = prompt;
    } else {
      if (!message.trim()) return;

      userText = message;
    }

    // Step 1: Add user's message with empty assistant field (awaiting response)
    setChat((prevChat) => [
      ...prevChat,
      {
        User: userText,
        Assistant: "Generating response",
        isTemporary: true,
        shouldAnimate: false,
      },
    ]);

    // Clear input
    setMessage("");

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Step 2: Simulate API response
    const response = await getChatResponse("new", userText);
    console.log("Response from API:", response);
    if (response.success) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          id: response.session_id,
          title: response.session_title,
        },
      ]);
      setIsnewChat(true);
      setNewChatHistory([
        {
          User: userText,
          Assistant: response.response,
          isTemporary: false,
          shouldAnimate: true,
          animationDone: false,
        },
      ]);
      navigate(`/chat/${response.session_id}`);
    }

    // Step 3: Replace the last message with full message containing actual assistant response
    setChat((prevChat) => {
      const updatedChat = [...prevChat];
      updatedChat[updatedChat.length - 1] = {
        User: userText,
        Assistant: "Error: Failed to generate response.",
        isTemporary: false,
        shouldAnimate: true,
        animationDone: false,
      };

      return [...updatedChat];
    });

    setGeneratingResponse(false);
  };

  const handlePromptClick = async (promptText) => {
    handleSend({ prompt: promptText });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="md:static flex flex-col items-center justify-center md:h-full p-4 md:p-0 md:px-2 md:m-0 w-full gap-2">
      {!showChat && (
        <div className="text-center px-4">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <i class="ri-wechat-channels-line text-4xl dark:text-white text-cyan-400"></i>
          </div>

          {/* Heading */}
          <h1 className="dark:text-white text-gray-600 text-xl md:text-3xl font-medium dark:text-shadow-lg">
            Welcome to{" "}
            <span className="dark:text-cyan-500 text-cyan-400">CoAegis</span>
          </h1>

          {/* Subtext */}
          <p className="dark:text-zinc-500 text-gray-600 mt-2 text-sm md:max-w-xl mx-auto">
            Introducing CoAegis — an advanced AI built to challenge assumptions,
            generate fearless ideas, and help you think beyond the obvious.Fast.
            Bold. Unfiltered.
          </p>
        </div>
      )}

      {/* Sample Prompts */}
      {!showChat && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 px-0 max-w-4xl mx-auto md:mt-8">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              className="dark:bg-[#121212] bg-[#f0f4f9] text-white p-4 rounded-xl shadow-lg border dark:border-gray-800 border-gray-200 dark:hover:border-cyan-500 hover:border-cyan-400  cursor-pointer transition hover:scale-105"
              onClick={() => handlePromptClick(prompt.text)}
            >
              <p className="text-sm mb-4 dark:text-zinc-400 text-gray-700">
                {prompt.text}
              </p>
              {/* <i className={`${prompt.icon} text-xl text-gray-400`}></i> */}
            </div>
          ))}
        </div>
      )}

      {/* Chat messages area */}
      {showChat && (
        <div className="flex-1 overflow-y-auto px-[6%] md:mt-6 md:px-[13%] w-full py-6 space-y-4 md:space-y-6 dark-scrollbar flex flex-col">
          {chat &&
            chat.map((msgObject, index) => {
              return ChatMessage({ msgObject, index, chat, setChat });
            })}

          <div ref={bottomRef}></div>
        </div>
      )}

      {/* Helper div for mobile view */}
      <div className="md:hidden dark:bg-neutral-900 bg-[#ffffff]fixed bottom-0 w-[calc(100%-2rem)] p-3"></div>
      {/* Input Box */}
      <div className="fixed bottom-0 w-[calc(100%-2rem)] p-3 mb-4 md:static dark:bg-[#0e0e0e] bg-[#ffffff] rounded-xl md:p-4 md:w-full max-w-4xl mx-auto shadow-lg border dark:border-gray-800 border-gray-200">
        {/* Input area */}
        <textarea
          rows={1}
          placeholder="Ask Anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          
          className="w-full bg-transparent resize-none dark:text-gray-200 text-gray-800 placeholder-zinc-500 outline-none p-2 text-sm"
        ></textarea>

        {/* Bottom Bar with Send Button */}
        <div className="flex justify-between mt-2 items-center">
          <div className="flex flex-1 items-center justify-start gap-4 dark:text-white text-gray-700 text-lg md:p-2">
            {/* Plus Icon */}
            <i className="ri-add-line cursor-pointer hover:text-cyan-400 transition"></i>

            {/* Mic Icon */}
            {/* <i className="ri-mic-line cursor-pointer hover:text-cyan-400 transition"></i> */}
          </div>

          <button
            onClick={handleSend}
            disabled={generatingResponse}
            className={
              generatingResponse
                ? "hidden md:block flex items-center gap-2 bg-gray-400  text-white text-sm font-medium px-4 py-1.5 rounded-md transition"
                : "hidden md:block flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 py-1.5 rounded-md transition"
            }
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

function parseText(text) {
  // Escape HTML characters
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold headings
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Links
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Code block
  text = text.replace(
    /```([\s\S]+?)```/g,
    (_, code) => `<pre>${code.trim()}</pre>`
  );

  // Bullet points: * Item
  text = text.replace(/(^|\n)\* (.+)/g, "$1<ul><li>$2</li></ul>");
  text = text.replace(/<\/ul>\n<ul>/g, ""); // merge

  // Numbered lists: 1. Item
  text = text.replace(/(^|\n)(\d+)\. (.+)/g, "$1@@@NUM@@@$3");

  const lines = text.split("\n");
  let inOl = false;
  let output = "";

  for (let line of lines) {
    if (line.startsWith("@@@NUM@@@")) {
      if (!inOl) {
        output += "<ol>";
        inOl = true;
      }
      output += `<li>${line.replace("@@@NUM@@@", "").trim()}</li>`;
    } else {
      if (inOl) {
        output += "</ol>";
        inOl = false;
      }
      output += "\n" + line;
    }
  }
  if (inOl) output += "</ol>";

  text = output;

  // Paragraphs
  text = text
    .split("\n\n")
    .map((para) => {
      if (
        para.startsWith("<ul>") ||
        para.startsWith("<ol>") ||
        para.startsWith("<pre>") ||
        para.includes("<li>")
      ) {
        return para;
      }
      return `<p>${para.trim()}</p>`;
    })
    .join("");

  return { __html: text };
}

function ChatMessage({ msgObject, index, chat, setChat }) {
  const assistantMessage = msgObject.Assistant;

  // Message display logic
  let content;

  if (msgObject.isTemporary) {
    // Show "Generating response..." with looping dots
    content = (
      <TypeAnimation
        sequence={[
          "Generating response.",
          500,
          "Generating response..",
          500,
          "Generating response...",
          500,
        ]}
        repeat={Infinity}
        cursor={false}
        speed={50}
        className="flex items-center p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
      />
    );
  } else if (msgObject.shouldAnimate && !msgObject.animationDone) {
    // Animate final assistant message
    content = (
      <div className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap">
        <TypeAnimation
          sequence={[
            assistantMessage,
            () => {
              setChat((prevChat) => {
                const updated = [...prevChat];
                updated[index] = {
                  ...updated[index],
                  animationDone: true,
                };
                return updated;
              });
            },
          ]}
          cursor={false}
          speed={100}
          repeat={0}
        />
      </div>
    );
  } else {
    // Show parsed message (bold, code, etc.) after animation is done or on reload
    content = (
      <div
        className="p-2 px-3 md:px-4 md:py-2 rounded-lg text-xs/6 md:text-sm/6 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
        dangerouslySetInnerHTML={parseText(assistantMessage)}
      />
    );
  }

  return (
    <div key={index}>
      {msgObject.User && (
        <div className="p-2 px-3 md:px-4 md:py-2 rounded-lg text-xs/6 md:text-sm/6 tracking-wide bg-neutral-800 text-gray-200 self-end ml-auto w-fit max-w-[80%] md:max-w-[50%]">
          {msgObject.User}
        </div>
      )}
      {content}
    </div>
  );
}

// const getChatResponse = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         success: true,
//         response: "Hello, how can I help you today?",
//       });
//     }, 5000);
//   });
// };
