import { CodeBlock } from "./CodeBlock";
import { H1, H2, H3, H4, H5, H6 } from "./Heading";
import { Paragraph, Strong, Emphasis, InlineCode, Pre, LineBreak } from "./Text";
import { UnorderedList, OrderedList, ListItem } from "./List";
import { Link, Image } from "./Link";
import { Blockquote, HorizontalRule } from "./Blockquote";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./Table";

// Export individual components
export { CodeBlock };
export { H1, H2, H3, H4, H5, H6 };
export { Paragraph, Strong, Emphasis, InlineCode, Pre, LineBreak };
export { UnorderedList, OrderedList, ListItem };
export { Link, Image };
export { Blockquote, HorizontalRule };
export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell };

// Export components object for ReactMarkdown
export const markdownComponents = {
  // Code
  code: CodeBlock,
  pre: Pre,
  
  // Headings
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  
  // Text
  p: Paragraph,
  strong: Strong,
  em: Emphasis,
  br: LineBreak,
  
  // Lists
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  
  // Links and Images
  a: Link,
  img: Image,
  
  // Blockquote and HR
  blockquote: Blockquote,
  hr: HorizontalRule,
  
  // Tables
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
}; 