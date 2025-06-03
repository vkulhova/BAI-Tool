import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-semibold transition-all  duration-300 rounded-lg outline-none";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-yellow-300 to-orange-500 dark:from-blue-500 dark:to-purple-600 shadow-lg hover:shadow-xl",
    secondary:
      "text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md hover:shadow-lg focus:ring-gray-500",
    outline:
      "text-blue-500 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 focus:ring-blue-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
    xl: "px-8 py-4 text-lg",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? disabledClasses : "cursor-pointer"}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
