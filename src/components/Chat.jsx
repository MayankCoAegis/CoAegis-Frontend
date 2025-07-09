import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../pages/ChatLayout";
import { TypeAnimation } from "react-type-animation";
import { getChatById, getChatResponse } from "../api/chat";
import { useLoader } from "../contexts/LoaderContext";

function Chat() {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);
  const [chat, setChat] = useState([]);
  const { setLoading } = useLoader();
  const [generatingResponse,setGeneratingResponse]=useState(false);
  const {newChatHistory, setNewChatHistory,IsnewChat, setIsnewChat}=useContext(ChatContext);
  const { chatId } = useParams();

  // Filter chat data based on chatId from URL params
  useEffect(() => {
    if(IsnewChat)
    {
      setIsnewChat(false);
      setChat(newChatHistory);
      return;
    }
    const fetchChat = async () => {
      const response = await getChatById(chatId);
      if (response.success) {
        console.log(`Chat ${chatId} Fetched Successfully`, response.chats);
        setChat(response.chats);
        setLoading(false);
      } else {
        console.log(`Chat ${chatId} fetch failed`, response.message);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchChat();
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
    setGeneratingResponse(true);

    if (!message.trim()) return;

    const userText = message;

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
    const response = await getChatResponse(chatId, userText);
    console.log("Response from API:", response);

    // Step 3: Replace the last message with full message containing actual assistant response
    setChat((prevChat) => {
      const updatedChat = [...prevChat];
      updatedChat[updatedChat.length - 1] = {
        User: userText,
        Assistant:
          (response.success && response.response) ||
          "Error: Failed to generate response.",
        isTemporary: false,
        shouldAnimate: true,
        animationDone: false,
      };

      return [...updatedChat];
    });

    setGeneratingResponse(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col h-full overflow-hidden items-center md:pt-6 ">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-[6%] md:px-[13%] py-6 w-full space-y-4 md:space-y-6 dark-scrollbar flex flex-col">
        {chat && chat.length == 0 && (
          <div className="text-center text-gray-400 text-sm">
            Start the conversation...
          </div>
        )}

        {chat &&
          chat.map((msgObject, index) => {
            const { User, Assistant } = msgObject;
            return (
              // <div key={index}>
              //   {User && (
              //     <div className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide bg-neutral-800 text-gray-200 self-end ml-auto w-fit max-w-[80%] md:max-w-[50%]">
              //       <span>{User}</span>
              //     </div>
              //   )}

              //   {/* {Assistant  && (
              //     <div className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
              //       dangerouslySetInnerHTML={parseText(Assistant)}>
              //     </div>
              //   )} */}

              //   {msgObject.isTemporary ? (
              //     <TypeAnimation
              //       sequence={[
              //         "Generating response.",
              //         500,
              //         "Generating response..",
              //         500,
              //         "Generating response...",
              //         500,
              //       ]}
              //       cursor={false}
              //       speed={50}
              //       repeat={Infinity}
              //       className="items-center p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
              //     />
              //   ) : msgObject.shouldAnimate && !msgObject.animationDone ? (
              //     <div className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap">
              //       <TypeAnimation
              //         sequence={Assistant}
              //         cursor={false}
              //         speed={100}
              //         repeat={0}
              //         onFinished={() => {
              //           // Set animationDone = true for this message
              //           setChat((prevChat) => {
              //             const updated = [...prevChat];
              //             updated[index] = {
              //               ...updated[index],
              //               animationDone: true,
              //             };
              //             return updated;
              //           });
              //         }}
              //       />
              //     </div>
              //   ) : (
              //     <div
              //       className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
              //       dangerouslySetInnerHTML={parseText(Assistant)}
              //     ></div>
              //   )}
              // </div>
              ChatMessage({ msgObject, index, chat, setChat })
            );
          })}

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
            disabled={generatingResponse}
            className={
              generatingResponse
                ? "hidden md:block flex items-center gap-2 bg-gray-400  text-neutral-300 text-sm font-medium px-4 py-1.5 rounded-md transition"
                : "hidden md:block flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-gray-200 text-sm font-medium px-4 py-1.5 rounded-md transition"
            }
          >
            Send
          </button>

          <button
            onClick={handleSend}
            disabled={generatingResponse}
            className={generatingResponse?"hidden":"md:hidden flex items-center gap-2 text-gray-200 text-sm font-medium p-2 px-1.5 rounded-full transition"}
          >
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

function parseText(text) {
  // Escape HTML characters
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headings (from h1 to h4)
  text = text
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Links
  text = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Code blocks
  text = text.replace(/```([\s\S]+?)```/g, (_, code) => `<pre>${code.trim()}</pre>`);

  // Handle bullet points (collect as a group)
  text = text.replace(/(^|\n)- (.+)/g, (match, newline, content) => {
    return `${newline}@@@BULLET@@@<li>${content}</li>`;
  });

  // Group bullets inside a single <ul>
  text = text.replace(/(@@@BULLET@@@)+/g, (match) => {
    const listItems = match
      .split("@@@BULLET@@@")
      .filter(Boolean)
      .join("");
    return `<ul>${listItems}</ul>`;
  });

  // Numbered list: convert to placeholder
  text = text.replace(/(^|\n)(\d+)\. (.+)/g, "$1@@@NUM@@@$3");

  // Convert numbered list into <ol><li>...</li></ol>
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
    .split(/\n{2,}/) // split by double line breaks
    .map((para) => {
      const trimmed = para.trim();
      if (
        trimmed.startsWith("<ul>") ||
        trimmed.startsWith("<ol>") ||
        trimmed.startsWith("<pre>") ||
        trimmed.startsWith("<h") ||
        trimmed.includes("<li>")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
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
        className="items-center p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
      />
    );
  } else if (msgObject.shouldAnimate && !msgObject.animationDone) {
    // Animate final assistant message
    content = (
      <div className="p-2 px-3 md:px-4 md:py-3 rounded-lg text-xs/6 md:text-sm/7 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap">
        <TypeAnimation
        splitter={(str) => str.split(/(?= )/)}
          sequence={[assistantMessage,() => {
            setChat((prevChat) => {
              const updated = [...prevChat];
              updated[index] = {
                ...updated[index],
                animationDone: true,
              };
              return updated;
            });
          }]}
          cursor={false}
          speed={99}
          repeat={0}
          
        />
      </div>
    );
  } else {
    // Show parsed message (bold, code, etc.) after animation is done or on reload
    content = (
      <div
        className="p-2 px-3 md:px-4 md:py-2 rounded-lg text-xs/5 md:text-sm/6 tracking-wide text-gray-200 self-start mr-auto assistant-response flex-wrap"
        dangerouslySetInnerHTML={parseText(assistantMessage)}
      />
    );
  }

  return <div key={index}>
      {msgObject.User && (
                  <div className="p-2 px-3 md:px-4 md:py-2 rounded-lg text-xs/5 md:text-sm/6 tracking-wide bg-neutral-800 text-gray-200 self-end ml-auto w-fit max-w-[80%] md:max-w-[50%]">
                    {msgObject.User}
                  </div>
                )}
      {content}
    </div>
  
}