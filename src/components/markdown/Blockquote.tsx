import { ClassAttributes, HTMLAttributes } from "react";

interface BlockquoteProps extends ClassAttributes<HTMLQuoteElement>, HTMLAttributes<HTMLQuoteElement> {
  children?: React.ReactNode;
}

interface HorizontalRuleProps extends ClassAttributes<HTMLHRElement>, HTMLAttributes<HTMLHRElement> {}

export function Blockquote(props: BlockquoteProps) {
  const { children, className, ...rest } = props;
  return (
    <blockquote 
      className={`border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50 ${className || ''}`}
      {...rest}
    >
      {children}
    </blockquote>
  );
}

export function HorizontalRule(props: HorizontalRuleProps) {
  const { className, ...rest } = props;
  return (
    <hr 
      className={`border-gray-300 my-6 ${className || ''}`}
      {...rest}
    />
  );
} 