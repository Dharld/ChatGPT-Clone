import { useEffect, useRef } from "react";
import { useShowSidebar } from "../../hooks/Show";
import NewChat from "../NewChat/NewChat";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const closeRef = useRef(null);
  const { getSidebarState, hideSidebar } = useShowSidebar();
  const hide = getSidebarState();
  const user = useSelector((state) => state.auth.user);

  const smallStyles = "absolute top-0 left-0";
  let style = hide
    ? "-translate-x-full md:translate-x-0"
    : "translate-x-0 md:translate-x-0";

  useEffect(() => {
    if (closeRef && closeRef.current) {
      closeRef.current.focus();
    }
  }, [hide]);

  return (
    <aside
      className={`${smallStyles} p-2 w-full max-w-[260px] h-full bg-surface ${style} flex flex-col md:relative md:p-4`}
    >
      <button
        className={`${
          hide ? "opacity-0" : "opacity-100"
        } absolute right-0 top-0 -mr-12 mt-8 h-fit p-2  rounded-sm focus:ring focus:ring-slate-100`}
        onClick={hideSidebar}
        ref={closeRef}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <NewChat />
      <div className="flex-1 h-full flex flex-col justify-end">
        {user ? (
          <div className="w-full h-10 flex items-center font-normal gap-2">
            <div className="w-[32px] h-[32px]">
              <img
                src={`${user.profileSrc}`}
                alt=""
                className="rounded-sm object-cover object-center"
              />
            </div>
            <span>{user.username}</span>
          </div>
        ) : (
          <div>
            <h3 className="text-base font-medium">Signup or Login</h3>
            <p className="leading-5 text-sm text-gray-400">
              Save your chat history, share chats, and personalize your
              experience
            </p>

            <Link to="/signup">
              <Button styles="w-full mt-2">Signup</Button>
            </Link>
            <Link to="/login">
              <Button styles="w-full mt-2" variant="secondary">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
