import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownMessage = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <pre className="bg-gray-300 p-2 rounded-md my-3 overflow-auto">
                <code className="language-js">{children}</code>
              </pre>
            ) : (
              <code className="bg-gray-200 p-1 rounded">{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default function Message({ role, content }) {
  const showGPTMessage = () => {
    return (
      <>
        <div className="flex py-3 items-start gap-2.5">
          <Image
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
            src={"/chat-gpt-pfp.webp"}
            alt="ChatBot image"
          />
          <div className="flex flex-col w-full min-w-64 md:max-w-2xl leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-900">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ChatBot
              </span>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(content);
                }}
                className="copy"
              >
                <svg
                  className="w-5 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words whitespace-pre-wrap">
              <MarkdownMessage content={content} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const showUserMessage = () => {
    return (
      <>
        <div className="flex justify-end items-start mt-2 gap-2.5">
          <div className="flex  flex-col w-full md:max-w-96 max-w-56 leading-1.5 p-4 border-gray-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-blue-400">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Me
              </span>
            </div>

            <span className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words whitespace-pre-wrap">
              <MarkdownMessage content={content} />
            </span>
          </div>
        </div>
      </>
    );
  };

  const showLoadingMessage = () => {
    return (
      <>
        <div className="flex py-3 items-start gap-2.5">
          <Image
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
            src={"/chat-gpt-pfp.webp"}
            alt="Jese image"
          />
          <div className="flex flex-col w-full md:max-w-96 max-w-56 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-900">
            <div className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words whitespace-pre-wrap">
              ChatBot is thinking...
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCorrectMessage = () => {
    if (role === "loading") {
      return <>{showLoadingMessage()}</>;
    } else if (role === "assistant") {
      return <>{showGPTMessage()}</>;
    } else {
      return <>{showUserMessage()}</>;
    }
  };

  return <>{renderCorrectMessage()}</>;
}
