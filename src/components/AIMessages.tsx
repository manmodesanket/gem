import { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function AIMessages({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code(props) {
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
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
