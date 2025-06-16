import { CSSProperties } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClassAttributes, HTMLAttributes } from "react";

interface CodeBlockProps extends ClassAttributes<HTMLElement>, HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  node?: any;
  ref?: React.LegacyRef<HTMLElement>;
}

export function CodeBlock(props: CodeBlockProps) {
  const { children, className, node, ref, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <SyntaxHighlighter
      {...rest}
      PreTag="div"
      children={String(children).replace(/\n$/, "")}
      language={match[1]}
      style={oneDark as { [key: string]: CSSProperties }}
    />
  ) : (
    <code
      {...rest}
      ref={ref as React.LegacyRef<HTMLElement>}
      className={className}
    >
      {children}
    </code>
  );
} 