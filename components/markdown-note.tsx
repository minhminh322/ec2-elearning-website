"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { CodeGenerator } from "@/components/code-generator/code-generator";
import React from "react";

export const MarkdownNote = ({ value }: { value: string }) => {
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
            />
          ) : (
            <code
              style={{
                backgroundColor: "#ffffff12",
                borderColor: "#f7faff1f",
                padding: "0.125rem",
                borderWidth: "1px",
                borderRadius: "5px",
                fontFamily: "Menlo,sans-serif",
                fontSize: "0.875em",
                color: "#eff1f6bf",
              }}
              {...props}
            >
              {props.children}
            </code>
          );
        },
        p: (props) => (
          <p
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
            {...props}
          >
            {props.children}
          </p>
        ),
        ol: (props) => (
          <ol className="list-inside list-decimal" {...props}>
            {props.children}
          </ol>
        ),
        ul: (props) => (
          <ul className="list-inside list-disc" {...props}>
            {props.children}
          </ul>
        ),
        li: (props) => {
          const { children } = props;

          // @ts-ignore
          for (let i = 0; i < children.length; i++) {
            // @ts-ignore
            const child = children[i] as React.ReactElement;

            if (React.isValidElement(child) && child.type.name === "p") {
              // If a paragraph element is found, render it inside the <li> element
              // @ts-ignore
              return (
                <li className="ml-4" {...props}>
                  {child.props?.children}
                </li>
              );
            }
          }

          // If no paragraph element is found, return null or undefined
          return null;
        },
        blockquote: (props) => (
          <blockquote
            className="border-l-4 border-green-500 pl-4 break-inside-avoid"
            {...props}
          >
            {props.children}
          </blockquote>
        ),
        h1: (props) => (
          <div>
            <h1 style={{ fontSize: "2em", margin: "0.67em 0" }} {...props}>
              {props.children}
            </h1>
            <hr
              style={{
                border: "none",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, #aaa, transparent)",
              }}
            />
          </div>
        ),
        h2: (props) => (
          <div>
            <h2 style={{ fontSize: "1.5em", margin: "0.83em 0" }} {...props}>
              {props.children}
            </h2>
            <hr
              style={{
                borderColor: "#ddd",
                borderTop: "1px solid #ddd",
                margin: "0.5em 0",
              }}
            />
          </div>
        ),
        h3: (props) => (
          <h3 style={{ fontSize: "1.17em", margin: "1em 0" }} {...props}>
            {props.children}
          </h3>
        ),
      }}
    />
    // </div>
  );
};
