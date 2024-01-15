"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";

export const MarkdownNote = ({ value }: { value: string }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  let codeStyle: { [key: string]: React.CSSProperties }, bgColor: string;

  switch (resolvedTheme) {
    case "light":
      codeStyle = oneLight;
      bgColor = "#fafafa";
      break;
    case "dark":
      codeStyle = oneDark;
      bgColor = "#282c34";
      break;
    default:
      codeStyle = oneLight;
      break;
  }

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkRehype]}
        children={value}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // @ts-ignore
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={codeStyle}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          // p: (props) => (
          //   <p className="inline" {...props}>
          //     {props.children}
          //   </p>
          // ),
          // ol: (props) => (
          //   <ol className="list-decimal list-inside" {...props}>
          //     {props.children}
          //   </ol>
          // ),
          ul: (props) => (
            <ul className="list-outside list-none" {...props}>
              {props.children}
            </ul>
          ),
          li: (props) => (
            <li className="mb-2" {...props}>
              {props.children}
            </li>
          ),
          blockquote: (props) => (
            <blockquote
              style={{
                backgroundColor: `${bgColor}`,
                borderLeft: "3px solid #01ff70",
                margin: "0 0 1em 0",
                padding: "0.5em 1em",
                pageBreakInside: "avoid",
              }}
              {...props}
            >
              {props.children}
            </blockquote>
          ),
          h1: (props) => (
            <h1 style={{ fontSize: "2em", margin: "0.67em 0" }} {...props}>
              {props.children}
            </h1>
          ),
          h2: (props) => (
            <h2 style={{ fontSize: "1.5em", margin: "0.83em 0" }} {...props}>
              {props.children}
            </h2>
          ),
          h3: (props) => (
            <h3 style={{ fontSize: "1.17em", margin: "1em 0" }} {...props}>
              {props.children}
            </h3>
          ),
          h4: (props) => (
            <h4 style={{ fontSize: "1em", margin: "1.33em 0" }} {...props}>
              {props.children}
            </h4>
          ),
          h5: (props) => (
            <h5 style={{ fontSize: "0.83em", margin: "1.67em 0" }} {...props}>
              {props.children}
            </h5>
          ),
          h6: (props) => (
            <h6 style={{ fontSize: "0.67em", margin: "2.33em 0" }} {...props}>
              {props.children}
            </h6>
          ),
        }}
      />
    </div>
  );
};
