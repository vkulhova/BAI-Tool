import { memo, forwardRef } from "react";

const Textarea = memo(forwardRef(({ className, placeholder, type, value, onChange, onKeyDown, style }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`min-h-[100px] w-full p-4 outline-none border-2 border-borderGray2 dark:border-borderGray bg-beige dark:bg-black1 text-gray-900 dark:text-gray-100 rounded-lg focus:border-orange dark:focus:border-violet focus:ring-2 focus:ring-orange/20 dark:focus:ring-violet/20 resize-vertical ${
        className || ""
      }`}
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{
        willChange: 'auto',
        contain: 'layout style paint',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        ...style
      }}
    />
  );
}));

Textarea.displayName = 'Textarea';

export default Textarea;
