import React, { createContext, use, useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import ProfilePanel from "../../components/ProfilePanel";
import { Outlet, useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import Sidebar from "../components/SideBar";
import SelectModel from "../components/SelectModel";
import profilepic from "/profile-coaegis.jpeg";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { getUserChats } from "../api/chat";

export const ChatContext = createContext();

const ChatLayout = () => {
  const { setLoading } = useLoader();
  const [isSideBarOpen, setisSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const { setShowSnackBar, setMessage } = useAlert();
  const { user, setUser } = useAuth();
  const [chatData, setChatData] = useState([
    {
      chatId: "chat101",
      userId: "userX1",
      chat: [
        {
          user: "Hi, I'm looking for remote jobs in web development.",
          time: "2025-06-24T09:00:00Z",
        },
        {
          assistant:
            "Got it! Do you prefer full-time, part-time, or freelance roles?",
          time: "2025-06-24T09:00:05Z",
        },
        { user: "Full-time would be great.", time: "2025-06-24T09:00:08Z" },
        {
          assistant:
            "Here are some full-time remote web development roles open right now: Senior Frontend Developer at TechFlow ($85k-120k), Full Stack Developer at CloudBase ($70k-95k), React Developer at StartupHub ($60k-80k), and Backend Developer at DataSync ($75k-100k). All offer comprehensive benefits and flexible schedules.",
          time: "2025-06-24T09:00:12Z",
        },
        {
          user: "Thanks! Can you filter by companies hiring internationally?",
          time: "2025-06-24T09:00:17Z",
        },
        {
          assistant:
            "Sure! Filtering listings to include companies open to international remote hiring. Here are the international-friendly options: TechFlow (hires globally), CloudBase (US, EU, Canada), StartupHub (worldwide except restricted countries), and GitLab has 3 new openings for international candidates. Would you like me to show visa sponsorship options as well?",
          time: "2025-06-24T09:00:22Z",
        },
        {
          user: "Perfect. Can I save some of these to view later?",
          time: "2025-06-24T09:00:25Z",
        },
        {
          assistant:
            "Yes, just tap the bookmark icon beside any job listing to save it. Your saved jobs will appear in the 'My Saved Jobs' section of your dashboard, and you'll get notifications if application deadlines are approaching or if similar roles become available.",
          time: "2025-06-24T09:00:30Z",
        },
      ],
    },
    {
      chatId: "chat102",
      userId: "userX2",
      chat: [
        {
          user: "Can you find internships for data science?",
          time: "2025-06-24T09:15:00Z",
        },
        {
          assistant:
            "Absolutely! Are you looking for remote or on-site internships?",
          time: "2025-06-24T09:15:04Z",
        },
        {
          user: "Remote, preferably in startups.",
          time: "2025-06-24T09:15:07Z",
        },
        {
          assistant:
            "Got it. Fetching remote data science internships in startups for you. Found 12 active positions: DataFlow AI (3-month program, $2000/month), ML Ventures (6-month with conversion opportunity), AnalyticsPro (flexible duration, equity option), and TechSeed (summer program with mentor pairing). Most require Python and SQL knowledge.",
          time: "2025-06-24T09:15:10Z",
        },
        {
          user: "Any with mentorship opportunities?",
          time: "2025-06-24T09:15:13Z",
        },
        {
          assistant:
            "Yes. Filtering results to show internships that offer active mentorship programs. Top matches: TechSeed pairs each intern with a senior data scientist for weekly 1:1s, DataFlow AI has structured learning paths with team leads, and ML Ventures offers project-based mentoring plus career guidance sessions. All three have high intern-to-full-time conversion rates.",
          time: "2025-06-24T09:15:17Z",
        },
        {
          user: "That would help me learn faster. Thanks!",
          time: "2025-06-24T09:15:21Z",
        },
        {
          assistant:
            "You're welcome! I've bookmarked these mentorship-focused opportunities for you. Would you like me to help you prepare application materials or practice common data science interview questions for these roles?",
          time: "2025-06-24T09:15:25Z",
        },
      ],
    },
    {
      chatId: "chat103",
      userId: "userX3",
      chat: [
        {
          user: "What are some high-paying jobs for freshers in software?",
          time: "2025-06-24T09:30:00Z",
        },
        {
          assistant:
            "Freshers can look into roles in backend development, DevOps, and data engineering. Want me to pull up live listings?",
          time: "2025-06-24T09:30:05Z",
        },
        { user: "Yes, please!", time: "2025-06-24T09:30:07Z" },
        {
          assistant:
            "Here are the current top-paying fresher roles available: Backend Developer at FinTech Solutions ($65k-75k), DevOps Engineer at CloudOps ($70k-80k), Data Engineer at StreamData ($68k-78k), Full Stack Developer at WebCorp ($60k-72k), and Site Reliability Engineer at ScaleTech ($72k-85k). Most include signing bonuses and stock options.",
          time: "2025-06-24T09:30:10Z",
        },
        {
          user: "Can you tell me which skills are in demand for backend roles?",
          time: "2025-06-24T09:30:13Z",
        },
        {
          assistant:
            "Definitely. Employers look for Node.js, Django, API development, and SQL expertise. Additionally, cloud platforms (AWS/Azure), containerization (Docker/Kubernetes), version control (Git), testing frameworks, and database optimization are highly valued. Many companies also prefer candidates with REST/GraphQL API experience and basic DevOps knowledge.",
          time: "2025-06-24T09:30:18Z",
        },
        {
          user: "Got it. I'll start brushing up on those.",
          time: "2025-06-24T09:30:21Z",
        },
        {
          assistant:
            "Great plan! I can recommend some free learning resources and coding challenges to help you practice these skills. Would you also like me to set up job alerts for backend positions that match your skill level as you progress?",
          time: "2025-06-24T09:30:25Z",
        },
      ],
    },
    {
      chatId: "chat104",
      userId: "userX4",
      chat: [
        {
          user: "Can you help me write a resume for marketing jobs?",
          time: "2025-06-24T09:45:00Z",
        },
        {
          assistant:
            "Of course! First, tell me about your experience and achievements in marketing.",
          time: "2025-06-24T09:45:03Z",
        },
        {
          user: "I did a 6-month internship in digital marketing at a startup.",
          time: "2025-06-24T09:45:06Z",
        },
        {
          assistant:
            "Great! Based on that, here's a tailored resume draft for entry-level marketing roles. I've highlighted your internship experience, included metrics where applicable, and structured it to emphasize your hands-on digital marketing exposure. The format is ATS-friendly and follows current industry standards for marketing positions.",
          time: "2025-06-24T09:45:10Z",
        },
        {
          user: "Can you add a skills section with SEO and content writing?",
          time: "2025-06-24T09:45:14Z",
        },
        {
          assistant:
            "Done. Added SEO, content writing, and also included tools like Google Analytics and Canva. I've organized the skills section into categories: Digital Marketing (SEO, SEM, Social Media), Content Creation (Content Writing, Copywriting, Visual Design), Analytics Tools (Google Analytics, Facebook Insights), and Design Software (Canva, Adobe Creative Suite basics).",
          time: "2025-06-24T09:45:18Z",
        },
        {
          user: "Looks good! How can I export it?",
          time: "2025-06-24T09:45:21Z",
        },
        {
          assistant:
            "You can download it as PDF or save it to your profile. The PDF maintains professional formatting for applications, while saving to your profile lets you easily customize it for different job applications. I can also help you create targeted versions for specific roles like Content Marketing, Social Media Marketing, or Digital Marketing Specialist positions.",
          time: "2025-06-24T09:45:25Z",
        },
      ],
    },
    {
      chatId: "chat105",
      userId: "userX5",
      chat: [
        {
          user: "Are there any work-from-home jobs for teachers?",
          time: "2025-06-24T10:00:00Z",
        },
        {
          assistant:
            "Yes, many online tutoring platforms are hiring. Are you looking for part-time or full-time?",
          time: "2025-06-24T10:00:03Z",
        },
        { user: "Part-time works for me.", time: "2025-06-24T10:00:05Z" },
        {
          assistant:
            "Here's a list of part-time teaching jobs you can apply for today: Online tutoring with Wyzant ($15-40/hour), course creation with Udemy (revenue sharing), virtual classroom teaching with Outschool ($10-40/hour), and corporate training with LinkedIn Learning. Most offer flexible scheduling around your current commitments.",
          time: "2025-06-24T10:00:08Z",
        },
        {
          user: "Any platform where I can teach English to international students?",
          time: "2025-06-24T10:00:12Z",
        },
        {
          assistant:
            "Yes. Platforms like Cambly and Preply are a great fit. I'll add them to your list. Cambly pays $10.20/hour for conversational English (no prep required), Preply lets you set your own rates ($5-40/hour), iTalki offers structured lesson formats, and Verbling focuses on professional language instruction. Most international students prefer flexible scheduling across time zones.",
          time: "2025-06-24T10:00:16Z",
        },
        {
          user: "Perfect. I'll start applying now.",
          time: "2025-06-24T10:00:20Z",
        },
        {
          assistant:
            "Excellent! I've compiled application requirements for each platform to save you time. Most need a short intro video and teaching demo. Would you like tips on creating compelling teaching profiles, or should I help you track your applications across these platforms?",
          time: "2025-06-24T10:00:24Z",
        },
      ],
    },
  ]);
  const [IsnewChat, setIsnewChat] = useState(false);
  const [newChatHistory, setNewChatHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    // console.log("Fetching Chats");
    const fetchChats = async () => {
      const response = await getUserChats();
      
      if (response.success) {
        // console.log("Chats Fetched Successfully", response.chats);
        setChatHistory(response.chats);
        setLoading(false);
      } else
      {
        console.log("Chats fetch failed", response.message);
        setLoading(false);
      } 
    };
    fetchChats();
  }, []);

  return (
    <div className="flex h-screen dark:bg-neutral-950 bg-[#f0f4f9]">
      {/* SideMenu Div */}
      <div className="flex flex-col h-full">
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setisSideBarOpen={setisSideBarOpen}
          chatData={chatData}
          setChatData={setChatData}
          setChatHistory={setChatHistory}
          chatHistory={chatHistory}
        />
      </div>
      {/* SideMenu Div ends */}

      {/* MainChat Div*/}
      <div className="flex flex-col flex-1 dark:bg-neutral-900 bg-[#ffffff] m-0 md:m-4 md:ml-0 rounded-lg dark:shadow-lg/50 shadow-md/20 border-1 dark:border-neutral-800 border-neutral-100">
        {/* Navbar */}
        <div className="md:hidden flex flex-row w-full items-center justify-between p-4 py-2">
          <div className="md:hidden items-center">
            <button
              onClick={() => setisSideBarOpen(!isSideBarOpen)}
              className=" rounded-md text-white"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
          {/* <SelectModel /> */}

          {/* Helper Div for alignment */}
          {/* <div className="hidden md:block"></div> */}
          <div
            className="md:hidden items-center"
            onClick={() => navigate("/chat")}
          >
            <i class="ri-pencil-line text-white text-lg"></i>
          </div>

          <div className="hidden items-center gap-2 p-2 md:flex">
            {/* Upload Button  */}
            {/* <div className="w-9 h-9 bg-neutral-900 rounded-lg shadow-md/50 border border-neutral-800 flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a]">
              <i className="ri-upload-2-line text-white text-lg"></i>
            </div> */}

            {/* Ellipsis Button */}
            {/* <div className="w-9 h-9 bg-neutral-900 shadow-md/50 border border-neutral-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a]">
              <i className="ri-more-2-fill text-white text-lg"></i>
            </div> */}

            {/* Profile Image Button */}
            {/* <div className="w-9 h-9 rounded-lg overflow-hidden cursor-pointer shadow-md/50 border border-neutral-800">
              <img
                src={profilepic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
        </div>

        <div className="pb-[140px] md:p-0 flex flex-col overflow-y-auto md:flex-1">
          <ChatContext.Provider value={{ chatData, setChatData,chatHistory, setChatHistory ,newChatHistory, setNewChatHistory,IsnewChat, setIsnewChat}}>
            <Outlet /> {/* This will render ChatMain, ProfilePage, etc. */}
          </ChatContext.Provider>
        </div>
      </div>
      {/* MainChat Div ends */}
    </div>
  );
};

export default ChatLayout;
