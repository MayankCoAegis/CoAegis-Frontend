import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function UsageSettings(){

  const {user}=useAuth();
     const [stats,setStats] = useState([
    {
      label: "Messages Sent",
      value: "Null",
      description: "Total number of individual messages you've sent across all chats."
    },
    {
      label: "Chats Created",
      value: "Null",
      description: "Number of unique chat sessions you initiated."
    },
    
    // {
    //   label: "Monthly Usage",
    //   value: "89%",
    //   description: "You've consumed 89% of your allowed usage quota this month.",
    //   barWidth: "89%",
    // },
  ])

  useEffect(()=>{
    if(user)
    {
      setStats([
        {
          label: "Messages Sent",
          value: user?.total_chats || 0,
          description: "Total number of individual messages you've sent across all chats."
        },
        {
          label: "Chats Created",
          value: user?.total_sessions || 0,
          description: "Number of unique chat sessions you initiated."
        },
        
        // {
        //   label: "Monthly Usage",
        //   value: "89%",
        //   description: "You've consumed 89% of your allowed usage quota this month.",
        //   barWidth: "89%",
        // },
      ])
    }
  },[user])

  return (
    <div className="p-6 text-white w-full max-w-xl">
      

      <div className="space-y-6">
        {stats.map((item, idx) => (
          <div key={idx} className="dark:bg-[#1f1f1f] bg-gray-100 p-4 rounded-md">
            <div className="text-cyan-400 text-xl font-semibold mb-1">{item.value}</div>
            <div className="dark:text-gray-300 text-gray-700 text-sm font-medium mb-2">{item.label}</div>
            <div className="dark:text-gray-400 text-gray-800 text-xs leading-relaxed">{item.description}</div>

            {item.barWidth && (
              <div className="w-full h-2 bg-gray-700 rounded-full mt-3">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: item.barWidth }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}