import React from "react";

const SearchIcon = ({
  className = "",
  ...props
}: React.ComponentPropsWithRef<"svg">): React.JSX.Element => {
  const defaultColor = "text-[#6C727F]";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${defaultColor} ${className}`}
      {...props}
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20L17 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
