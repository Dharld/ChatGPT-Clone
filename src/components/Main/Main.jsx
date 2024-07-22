import { useEffect, useRef, useState } from "react";
import { useShowSidebar } from "../../hooks/Show";
import Button from "../Button/Button";
import ChatInput from "../ChatInput/ChatInput";
import { useToast } from "../../hooks/Toaster";
import { useHistory } from "../../hooks/History";
import "./Main.scss";
import { useSelector } from "react-redux";

const defaultUserIcon = `${
  import.meta.env.VITE_SUPABASE_STORAGE
}/application/default-user-icon.png`;
const openAIIcon = `${
  import.meta.env.VITE_SUPABASE_STORAGE
}/application/openai.png`;

export default function Main() {
  const {
    addMessage,
    getChats,
    currentConversation: conversation,
    eventTarget,
  } = useHistory();
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { showSidebar } = useShowSidebar();
  const { errorToast } = useToast();
  const user = useSelector((state) => state.auth.user);
  const containerRef = useRef(null);

  eventTarget.addEventListener("AIResponse", () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  const handleChange = (e) => {
    setChatInput(e.target.value);
  };

  const sendMessage = async () => {
    if (chatInput) {
      addMessage("user", chatInput);
      setChatInput("");
    } else {
      errorToast("Please enter a message");
    }
  };

  useEffect(() => {
    setChat(getChats());
  }, [conversation]);

  return (
    <main className="bg-surface-light h-full flex flex-col">
      <header className="flex justify-between border-b border-b-medium p-2 items-center md:p-4 md:border-b-0">
        <div className="cursor-pointer md:hidden" onClick={showSidebar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="font-medium text-lg">
          ChatGPT <span className="text-gray-300">3.5</span>
        </div>
        <Button styles="md:hidden">Signup</Button>
      </header>
      <div
        className="wrapper hide-scroll h-[80vh] overflow-y-auto py-2"
        ref={containerRef}
      >
        <div className="max-w-[700px] w-full h-full mx-auto flex flex-col">
          <div className="px-3">
            {chat.map((c, i) => (
              <div key={i} className="flex gap-2 my-6">
                <div
                  className={`w-7 h-7 border-[0.125px] ${
                    c.role == "user" ? "" : "border-medium p-1"
                  }  rounded-full overflow-hidden shrink-0`}
                >
                  {c.role == "user" ? (
                    <img
                      src={user ? user.profileSrc : defaultUserIcon}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={openAIIcon}
                      alt=""
                      className="w-full h-full object-cover filter invert"
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium leading-none">
                    {c.role == "user" ? "You" : "ChatGPT"}
                  </div>
                  <span>{c.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex-1 max-w-[700px] w-full mx-auto">
        <div className="absolute left-0 bottom-8 px-3 w-full">
          <ChatInput
            value={chatInput}
            handleChange={handleChange}
            handleTrigger={sendMessage}
          />
        </div>
      </div>
    </main>
  );
}
