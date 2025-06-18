import { ClassAttributes, HTMLAttributes } from "react";

interface HeadingProps extends ClassAttributes<HTMLHeadingElement>, HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function H1(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h1 
      className={`text-3xl font-bold mb-4 mt-6 text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </h1>
  );
}

export function H2(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h2 
      className={`text-2xl font-semibold mb-3 mt-5 text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

export function H3(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h3 
      className={`text-xl font-semibold mb-2 mt-4 text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function H4(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h4 
      className={`text-lg font-medium mb-2 mt-3 text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </h4>
  );
}

export function H5(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h5 
      className={`text-base font-medium mb-1 mt-2 text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </h5>
  );
}

export function H6(props: HeadingProps) {
  const { children, className, ...rest } = props;
  return (
    <h6 
      className={`text-sm font-medium mb-1 mt-2 text-gray-700 ${className || ''}`}
      {...rest}
    >
      {children}
    </h6>
  );
} 