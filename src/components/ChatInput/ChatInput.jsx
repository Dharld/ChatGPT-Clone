import { useEffect } from "react";

/* eslint-disable react/prop-types */
export default function ChatInput({ value, handleChange, handleTrigger }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleTrigger();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleTrigger]);

  return (
    <div className="w-full flex border border-medium py-3 px-4 rounded-2xl focus-within:border-gray-600">
      <input
        type="text"
        className="flex-1 bg-transparent placeholder:font-medium outline-none placeholder:text-gray-400 placeholder:text-medium placeholder:text-base"
        placeholder="Message ChatGPT"
        value={value}
        onChange={handleChange}
      />
      <div
        className="bg-medium rounded-md p-1 cursor-pointer hover:bg-white transition-colors"
        onClick={handleTrigger}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white dark:text-black"
        >
          <path
            d="M7 11L12 6L17 11M12 18V7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
}
