"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CodeCopyButton from "./copy-button";
interface CodeGeneratorProps {
  sourceCode: string;
  language: string;
  style: { [key: string]: React.CSSProperties };
  [key: string]: any; // This will allow any other properties
}
export const CodeGenerator = ({
  sourceCode,
  language,
  style,
  ...rest
}: CodeGeneratorProps) => {
  return (
    <div className="relative">
      <CodeCopyButton code={sourceCode} language={language} />
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={language}
        style={style}
        customStyle={{ maxHeight: "80vh", width: "100%" }}
      >
        {sourceCode}
      </SyntaxHighlighter>
    </div>
  );
};
