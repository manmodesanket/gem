import { ClassAttributes, HTMLAttributes, OlHTMLAttributes, LiHTMLAttributes } from "react";

interface UnorderedListProps extends ClassAttributes<HTMLUListElement>, HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

interface OrderedListProps extends ClassAttributes<HTMLOListElement>, OlHTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode;
}

interface ListItemProps extends ClassAttributes<HTMLLIElement>, LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export function UnorderedList(props: UnorderedListProps) {
  const { children, className, ...rest } = props;
  return (
    <ul 
      className={`list-disc list-inside mb-4 space-y-1 text-gray-800 ${className || ''}`}
      {...rest}
    >
      {children}
    </ul>
  );
}

export function OrderedList(props: OrderedListProps) {
  const { children, className, ...rest } = props;
  return (
    <ol 
      className={`list-decimal list-inside mb-4 space-y-1 text-gray-800 ${className || ''}`}
      {...rest}
    >
      {children}
    </ol>
  );
}

export function ListItem(props: ListItemProps) {
  const { children, className, ...rest } = props;
  return (
    <li 
      className={`leading-relaxed ${className || ''}`}
      {...rest}
    >
      {children}
    </li>
  );
} 