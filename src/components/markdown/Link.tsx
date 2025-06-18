import { ClassAttributes, AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

interface LinkProps extends ClassAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

interface ImageProps extends ClassAttributes<HTMLImageElement>, ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

export function Link(props: LinkProps) {
  const { children, className, href, ...rest } = props;
  return (
    <a 
      href={href}
      className={`text-blue-600 hover:text-blue-800 underline transition-colors ${className || ''}`}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Image(props: ImageProps) {
  const { className, alt, ...rest } = props;
  return (
    <img 
      alt={alt}
      className={`max-w-full h-auto rounded-lg shadow-sm my-4 ${className || ''}`}
      {...rest}
    />
  );
} 