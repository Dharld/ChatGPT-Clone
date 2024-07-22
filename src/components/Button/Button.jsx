/* eslint-disable react/prop-types */
import Spinner from "../Spinner/Spinner";
import "./Button.scss";

const baseStyles = `
  rounded-md
  min-h-[48px]
  w-fit
  px-4
  py-2
`;
export default function Button({
  type,
  children,
  styles = "",
  variant = "primary",
  loading = false,
  handleClick = () => {},
}) {
  let loadingColor = "#10A37F";

  if (variant === "primary") {
    styles += " bg-primary hover:bg-primary-hover border-primary";
    loadingColor = "white";
  } else if (variant === "secondary") {
    styles += " bg-medium hover:bg-medium-hover border border-outline";
  } else if (variant === "tertiary") {
    styles += " border border-slate-200 hover:bg-slate-100";
  }

  return (
    <button
      type={type}
      className={`transition-colors ${baseStyles} ${styles} border`}
      onClick={handleClick}
    >
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner size={32} color={loadingColor} />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
