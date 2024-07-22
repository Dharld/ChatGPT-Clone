/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import Button from "../../components/Button/Button";

export default function AuthLayout({ children }) {
  return (
    <div className="container max-w-[400px] mx-auto h-full pt-8 px-4 text-slate-800">
      <img
        src="https://auth.openai.com/assets/openai-logo-DmWoKcI3.svg"
        alt=""
        className="w-[64px] h-[64px] mx-auto object-cover"
      />
      {children}
      <div className="flex items-center gap-4 w-full mt-4">
        <span className="w-1/2 border h-[1px]"></span>
        <span>OR</span>
        <span className="w-1/2 border h-[1px]"></span>
      </div>
      <div className="w-full">
        <Button
          styles="w-full mt-4 flex items-center gap-4 text-base"
          variant="tertiary"
        >
          <span className="w-[20px] h-[20px] flex">
            <img
              src="	https://auth.openai.com/assets/google-logo-NePEveMl.svg"
              alt=""
            />
          </span>
          <span>Continue With Google</span>
        </Button>
      </div>
    </div>
  );
}
