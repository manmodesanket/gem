import { ClassAttributes, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

interface TableProps extends ClassAttributes<HTMLTableElement>, HTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

interface TableHeadProps extends ClassAttributes<HTMLTableSectionElement>, HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

interface TableBodyProps extends ClassAttributes<HTMLTableSectionElement>, HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

interface TableRowProps extends ClassAttributes<HTMLTableRowElement>, HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
}

interface TableHeaderProps extends ClassAttributes<HTMLTableHeaderCellElement>, ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
}

interface TableCellProps extends ClassAttributes<HTMLTableDataCellElement>, TdHTMLAttributes<HTMLTableDataCellElement> {
  children?: React.ReactNode;
}

export function Table(props: TableProps) {
  const { children, className, ...rest } = props;
  return (
    <div className="overflow-x-auto my-4">
      <table 
        className={`min-w-full border-collapse border border-gray-300 ${className || ''}`}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead(props: TableHeadProps) {
  const { children, className, ...rest } = props;
  return (
    <thead 
      className={`bg-gray-100 ${className || ''}`}
      {...rest}
    >
      {children}
    </thead>
  );
}

export function TableBody(props: TableBodyProps) {
  const { children, className, ...rest } = props;
  return (
    <tbody 
      className={`${className || ''}`}
      {...rest}
    >
      {children}
    </tbody>
  );
}

export function TableRow(props: TableRowProps) {
  const { children, className, ...rest } = props;
  return (
    <tr 
      className={`border-b border-gray-200 hover:bg-gray-50 ${className || ''}`}
      {...rest}
    >
      {children}
    </tr>
  );
}

export function TableHeader(props: TableHeaderProps) {
  const { children, className, ...rest } = props;
  return (
    <th 
      className={`border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900 ${className || ''}`}
      {...rest}
    >
      {children}
    </th>
  );
}

export function TableCell(props: TableCellProps) {
  const { children, className, ...rest } = props;
  return (
    <td 
      className={`border border-gray-300 px-4 py-2 text-gray-800 ${className || ''}`}
      {...rest}
    >
      {children}
    </td>
  );
} 