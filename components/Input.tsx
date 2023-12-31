import React from "react";

export default function Input({
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      className="my-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-blue-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      {...props}
    />
  );
}
