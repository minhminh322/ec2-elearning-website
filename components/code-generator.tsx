"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeGeneratorProps {
  sourceCode: string;
  language: string;
  style: string;
}
export const CodeGenerator = ({
  sourceCode,
  language,
  style,
}: CodeGeneratorProps) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {sourceCode}
    </SyntaxHighlighter>
  );
};
