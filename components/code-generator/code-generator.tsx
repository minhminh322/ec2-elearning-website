"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CodeCopyButton from "./copy-button";
import { useTheme } from "next-themes";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeGeneratorProps {
  sourceCode: string;
  language: string;
  // style: { [key: string]: React.CSSProperties };
  [key: string]: any; // This will allow any other properties
}
export const CodeGenerator = ({
  sourceCode,
  language,
  ...rest
}: CodeGeneratorProps) => {
  const { theme } = useTheme();
  return (
    <div className="relative w-full h-full">
      <CodeCopyButton code={sourceCode} language={language} />
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={language}
        style={theme === "dark" ? oneDark : oneLight}
        customStyle={{ maxHeight: "80vh", width: "100%" }}
      >
        {sourceCode}
      </SyntaxHighlighter>
    </div>
  );
};
