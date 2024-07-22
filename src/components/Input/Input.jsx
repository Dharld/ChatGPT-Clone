import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function Input({
  name,
  type = "text",
  label,
  styles,
  value,
  handleChange,
}) {
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    setEmpty(value ? false : true);
  }, [value]);

  return (
    <div
      className={`group flex relative border-sm rounded-md border  px-[1.1rem] py-3 focus-within:border-primary ${styles} ${
        empty ? "border-slate-200" : "border-primary"
      }`}
    >
      <input
        id={name}
        name={name}
        type={type}
        className="w-full outline-none relative z-10 bg-transparent"
        value={value}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={`absolute left-[.6rem] px-2  bg-white transition-all text-base group-focus-within:-top-3 group-focus-within:text-primary group-focus-within:text-sm group-focus-within:font-medium ${
          !empty ? "text-primary text-sm font-medium -top-3" : "text-slate-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
