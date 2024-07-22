/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import openai from "../api/connect-openai.js";
import { Conversation } from "../model/Conversation";

const historyContext = createContext("history");
const defaultConversation = new Conversation("Default Conversation");
defaultConversation.addChat({
  role: "assistant",
  content: "Hello! How can I help you today?",
});

export function HistoryProvider({ children }) {
  const [currentConversation, setCurrentConversation] =
    useState(defaultConversation);

  const [history, setHistory] = useState([currentConversation]);

  const addMessage = useCallback(
    async (role, content) => {
      const newConversation = Conversation.from(currentConversation);
      newConversation.addChat({ role, content });
      setCurrentConversation(newConversation);
    },
    [currentConversation]
  );

  const clearHistory = useCallback(() => {
    setCurrentConversation(defaultConversation);
    setHistory([defaultConversation]);
  }, [defaultConversation]);

  const newConversation = useCallback(async () => {
    try {
      await currentConversation.save();
      clearHistory();
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

  const eventTarget = new EventTarget();

  const customEvent = new CustomEvent("AIResponse");

  const getChats = useCallback(() => {
    return currentConversation.getChats();
  }, [currentConversation]);

  useEffect(() => {
    const generateResponse = async function () {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: getChats(),
          temperature: 0.7,
        });
        const text = response.choices[0].message.content;
        return text;
      } catch (error) {
        console.error(error);
        return "Sorry, I couldn't generate a response. Please try again!";
      }
    };

    if (currentConversation.getLatestChat().role === "user") {
      generateResponse().then((response) => {
        addMessage("assistant", response);
        eventTarget.dispatchEvent(customEvent);
      });
    }
  }, [currentConversation, addMessage, getChats]);

  return (
    <historyContext.Provider
      value={{
        addMessage,
        currentConversation,
        getChats,
        eventTarget,
        newConversation,
      }}
    >
      {children}
    </historyContext.Provider>
  );
}

export const useHistory = () => {
  return useContext(historyContext);
};
