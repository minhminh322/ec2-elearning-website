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
import { CodeGenerator } from "@/components/code-generator/code-generator";

export const MarkdownNote = ({ value }: { value: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    // <div className="overflow-y-auto whitespace-pre-wrap">
    <Markdown
      className="h-full whitespace-pre-wrap p-5"
      remarkPlugins={[remarkGfm, remarkRehype]}
      children={value}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeGenerator
              {...rest}
              sourceCode={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={theme === "dark" ? oneDark : oneLight}
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
              // backgroundColor: `bg-slate-50`,
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
    // </div>
  );
};
