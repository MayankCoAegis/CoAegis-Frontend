import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../pages/ChatLayout";
import { getResponse } from "../api/auth";
import { TypeAnimation } from "react-type-animation";

function Chat() {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);
  const [chat, setChat] = useState({});

  const { chatData } = useContext(ChatContext);

  const { chatId } = useParams();
  const [generatingResponse, setGeneratingResponse] = useState(false);

  // Filter chat data based on chatId from URL params
  useEffect(() => {
    setChat(chatData.filter((chat) => chat.chatId == chatId)[0]);
  }, [chatId]);

  // const handleSend = async() => {
  //     setGeneratingResponse(true);
  //   if (!message.trim()) return;

  //   const newMessage = {
  //     user: message,
  //     time: new Date().toLocaleTimeString(),
  //   };

  //     const generatingMessage = {
  //     assistant: "Generating response",
  //     time: new Date().toLocaleTimeString(),
  //     isTemporary: true,
  //   };

  //    setChat((prevChat) => {
  //     // Return a new object (don't mutate)
  //     return {
  //       ...prevChat,
  //       chat: [...prevChat.chat, newMessage,generatingMessage], // new array with added message
  //     };
  // });
  // console.log("Updated chat:", chat);

  //   const response=await getResponse(message);
  //   console.log("Response from API:", response);
  //   if(response){
  //    let tempChatObject={...chat};
  //    tempChatObject.chat[tempChatObject.chat.length-1].assistant=response.message;
  //    setChat(tempChatObject);

  //     console.log("Updated chat after api call:", chat);
  //   }

  //   setMessage("");

  //   setTimeout(() => {
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 100);
  // };

  // Auto-scroll to bottom on chat render/update

  const handleSend = async () => {
    if (!message.trim()) return;

    setGeneratingResponse(true);

    const userMessage = {
      user: message,
      time: new Date().toLocaleTimeString(),
    };

    const generatingMessage = {
      assistant: "Generating response",
      time: new Date().toLocaleTimeString(),
      isTemporary: true,
    };

    // Step 1: Add user's message + generating message
    setChat((prevChat) => ({
      ...prevChat,
      chat: [...prevChat.chat, userMessage, generatingMessage],
    }));

    // Clear message input
    setMessage("");

    // Scroll after short delay
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Step 2: Wait and simulate response
    const response = await getResponse(message); // Simulated API call
    console.log("Response from API:", response);

    // Step 3: Replace the last message (generating) with actual response or error
    setChat((prevChat) => {
      const updatedChat = [...prevChat.chat];
      updatedChat.pop(); // Remove the temporary assistant message

      const finalMessage = {
        assistant:
          (response.success && response.response.text) ||
          "❌ Error: Failed to generate response.",
        time: new Date().toLocaleTimeString(),
        animate: true, // Optional: Add animation class if needed
      };

      return {
        ...prevChat,
        chat: [...updatedChat, finalMessage],
      };
    });

    setGeneratingResponse(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-[10%] md:px-[13%] py-6 space-y-4 md:space-y-6 dark-scrollbar">
        {chat && chat.chat && chat.chat.length == 0 && (
          <div className="text-center text-gray-400 text-sm">
            Start the conversation...
          </div>
        )}

        {chat &&
          chat.chat &&
          chat.chat.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-3 rounded-lg text-sm/7 tracking-wide ${
                msg.user
                  ? "bg-neutral-800 text-gray-200 self-end ml-auto w-fit max-w-[80%] md:max-w-[50%]"
                  : "text-gray-200 self-start mr-auto"
              } ${
                generatingResponse && msg.assistant && msg.isTemporary
                  ? "dots"
                  : ""
              }`}
            >
              {/* {msg.user || msg.assistant} */}

              {msg.assistant && msg.animate ? (
                <TypeAnimation
                  sequence={[msg.assistant]}
                  wrapper="span"
                  cursor={false}
                  speed={50}
                  style={{ whiteSpace: "pre-line", display: "inline-block" }}
                />
              ) : msg.assistant ? (
                <span>{msg.assistant}</span>
              ) : null}

              {msg.user && <span>{msg.user}</span>}
            </div>
          ))}

        <div ref={bottomRef}></div>
      </div>

      {/* Mobile helper space */}
      <div className="md:hidden bg-neutral-900 fixed bottom-0 w-[calc(100%-2rem)] p-3"></div>

      {/* Input Box */}
      <div className="fixed bottom-0 w-[calc(100%-2rem)] p-3 mb-4 md:static bg-[#0e0e0e] rounded-xl md:p-4 md:w-3/4  mx-auto shadow-lg border border-gray-800  ">
        <textarea
          rows={1}
          placeholder="Ask Anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent resize-none text-gray-200 placeholder-zinc-500 outline-none p-2 text-sm"
        ></textarea>

        <div className="flex justify-between mt-2 items-center">
          <div className="flex flex-1 items-center justify-start gap-4 text-white text-lg md:p-2">
            {/* <i className="ri-add-line cursor-pointer hover:text-cyan-400 transition"></i> */}
            <i className="ri-mic-line cursor-pointer hover:text-cyan-400 transition"></i>
          </div>

          <button
            onClick={handleSend}
            className="hidden md:block flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-gray-200 text-sm font-medium px-4 py-1.5 rounded-md transition"
          >
            Send
          </button>

          <button
            onClick={handleSend}
            className="md:hidden flex items-center gap-2 text-gray-200 text-sm font-medium p-2 px-1.5 rounded-full transition"
          >
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
