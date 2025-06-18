import { ClassAttributes, HTMLAttributes } from "react";

interface ParagraphProps extends ClassAttributes<HTMLParagraphElement>, HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

interface StrongProps extends ClassAttributes<HTMLElement>, HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface EmphasisProps extends ClassAttributes<HTMLElement>, HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface InlineCodeProps extends ClassAttributes<HTMLElement>, HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface PreProps extends ClassAttributes<HTMLPreElement>, HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

interface LineBreakProps extends ClassAttributes<HTMLBRElement>, HTMLAttributes<HTMLBRElement> {}

export function Paragraph(props: ParagraphProps) {
  const { children, className, ...rest } = props;
  return (
    <p 
      className={`mb-4 leading-relaxed text-gray-800 ${className || ''}`}
      {...rest}
    >
      {children}
    </p>
  );
}

export function Strong(props: StrongProps) {
  const { children, className, ...rest } = props;
  return (
    <strong 
      className={`font-semibold text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </strong>
  );
}

export function Emphasis(props: EmphasisProps) {
  const { children, className, ...rest } = props;
  return (
    <em 
      className={`italic text-gray-800 ${className || ''}`}
      {...rest}
    >
      {children}
    </em>
  );
}

export function InlineCode(props: InlineCodeProps) {
  const { children, className, ...rest } = props;
  return (
    <code 
      className={`bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono ${className || ''}`}
      {...rest}
    >
      {children}
    </code>
  );
}

export function Pre(props: PreProps) {
  const { children, className, ...rest } = props;
  return (
    <pre 
      className={`bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm ${className || ''}`}
      {...rest}
    >
      {children}
    </pre>
  );
}

export function LineBreak(props: LineBreakProps) {
  const { className, ...rest } = props;
  return (
    <br 
      className={`${className || ''}`}
      {...rest}
    />
  );
} 