import React from "react";
import Input from "./Input";

export default function ChatArea() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex-grow messages-section overflow-y-auto p-4 flex justify-center">
        <div className="message-area w-full md:w-2/3">
          <div className="first-message border bg-base-300 p-4">
            <OpeningMessage />
          </div>
        </div>
      </section>
      <section className="input-area flex justify-center p-4 shadow-md">
        <div className="w-full md:w-2/3">
          <Input />
        </div>
      </section>
    </div>
  );
}

const OpeningMessage = () => {
  return (
    <>
      <div className="opening-message w-full grid place-items-center text-center space-y-4">
        <span className="message text-2xl md:text-4xl my-4 text-gray-800">
          How can I help you today?
        </span>
        <div className="container w-full grid grid-cols-3 gap-4 place-items-center text-center">
          <div className="add-file-container flex flex-col items-center">
            <span className="file-icon">
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.293 9.293a1 1 0 0 1 0 1.414L9.414 14l1.293 1.293a1 1 0 0 1-1.414 1.414l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0Zm2.586 1.414a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414L14.586 14l-1.293-1.293Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="mt-2 text-gray-600">Upload Files</span>
          </div>
          <div className="ask-anything-container flex flex-col items-center">
            <span className="question-icon">
              <svg
                className="w-10 h-10 text-gray-800"
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
                  d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <span className="mt-2 text-gray-600">Ask Anything</span>
          </div>
          <div className="add-image-container flex flex-col items-center">
            <span className="image-icon">
              <svg
                className="w-10 h-10 text-gray-800"
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
                  d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
            </span>
            <span className="mt-2 text-gray-600">Upload Images</span>
          </div>
        </div>
      </div>
    </>
  );
};
