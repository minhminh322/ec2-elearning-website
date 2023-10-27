"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeGeneratorProps {
  sourceCode: string;
  language: string;
  style: any;
}
export const CodeGenerator = ({
  sourceCode,
  language,
  style,
}: CodeGeneratorProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      customStyle={{ maxHeight: "80vh", width: "90%" }}
    >
      {sourceCode}
    </SyntaxHighlighter>
  );
};
