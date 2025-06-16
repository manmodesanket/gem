import ReactMarkdown from "react-markdown";
import { markdownComponents } from "./markdown";

export function AIMessages({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}
