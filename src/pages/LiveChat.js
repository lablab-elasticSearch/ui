import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../constants";
import userContext from "../contexts/UserContext";
import PlotComponent from "../components/PlotComponent";
import SelectUser from "../components/SelectUser";

const LiveChat = () => {
  const { user } = useContext(userContext);

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setMessages([])
  }, [user]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendPrompt = async () => {
    const obj = {
      content: prompt,
      type: "human",
    };
    setMessages((prevMessages) => [...prevMessages, obj]);
    setPrompt("");

    const reqBody = {
        prompt: prompt,
        user_id: user.user_id,
      };
  
    setTimeout(async () => {
        try {
            const r = await axios.post(
                `${backendUrl}/generate`,
                reqBody,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const response=r.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", data: { type: "message", content: response.answerText } },
      ]);
      if (response.plots) {
        response.plots.forEach((plot) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "ai", data: { type: "plots", content: plot } },
          ]);
        });
      }
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "ai", data: { type: "message", content: response.answerText } },
          ]);
          if (response.plots) {
            response.plots.forEach((plot) => {
              setMessages((prevMessages) => [
                ...prevMessages,
                { type: "ai", data: { type: "plots", content: plot } },
              ]);
            });
          }
    
          scrollToBottom();
        } catch (error) {
          toast.error("Could not generate response");
        }
      }, 5000); // 2000 milliseconds = 2 seconds
    };
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center bg-gray-100">
      <div className="w-full bg-indigo-900 text-white text-2xl font-semibold tracking-wide flex justify-between items-center p-3 shadow-lg">
        <h1 className="ml-4">IssueCopilot.AI</h1>
        <SelectUser />
      </div>
      <div className="w-full h-full overflow-y-scroll mt-4 flex-1">
        <div className="mx-8">
          {messages.length === 0 && (
            <div className="text-gray-500 text-2xl flex flex-col justify-center items-center">
              Start by asking something...
            </div>
          )}
          {messages.map((item, index) => (
  <div
    key={index}
    className={`p-2 max-w-fit mb-4 ${
      item.type === "human" ? "ml-auto" : "mr-auto"
    } ${
      item.type === "human"
        ? "bg-green-300 self-end rounded-lg"
        : "bg-white border border-green-300 text-green-800 self-start rounded-lg"
    }`}
  >
    {item.type === "ai" && item.data.type === "message" && (
      <div
        className={`${
          item.data.content.type === "human" ? "human" : "ai"
        }`}
      >
        {/* Split the content by \n and render each line as a separate div */}
        {item.data.content.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    )}
    {item.type === "ai" && item.data.type === "plots" && (
      <div>
        {/* Adjust the width style */}
        <PlotComponent plot={item.data.content} />
      </div>
    )}
    {item.type === "human" && (
      <div className="human">
        {/* Split the content by \n and render each line as a separate div */}
        {item.content.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    )}
  </div>
))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center mt-2 w-full mb-4 mx-4">
    <textarea
        value={prompt}
        className="border border-green-300 w-full md:w-5/6 h-12 resize-none pl-3 overflow-visible rounded-lg mb-2 md:mb-0 md:mr-2 ml-2"
        onChange={(e) => {
            setPrompt(e.target.value);
        }}
    />
    
    <button
        onClick={sendPrompt}
        className="bg-indigo-900 text-white h-10 cursor-pointer disabled:bg-gray-300 rounded-lg md:w-auto mx-2 md:mx-0 w-full md:w-auto"
        disabled={prompt.trim() === ""}
    >
        <div className="mx-4">
        Send
        </div>
    </button>
</div>
    </div>
  );
};

export default LiveChat;
