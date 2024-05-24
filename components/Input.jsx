import React from "react";

export default function Input({
  setMessages,
  setLoading,
  loading,
  message,
  setMessage,
  sendMessageRef,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: message.content,
        },
        {
          role: "loading",
        },
      ]);

      const prompt = message.content;

      setMessage({
        role: "user",
        content: "",
      });

      const response = await fetch("http://localhost:5000/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      setMessages((prev) => prev.slice(0, -1));

      if (response.ok) {
        const messageFromGPT = await response.json();
        setMessages((prev) => [...prev, messageFromGPT.result]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>

        <div className="flex items-center md:px-5 py-2 rounded-full  dark:bg-gray-700">
          <textarea
            id="chat"
            rows="1"
            spellCheck="false"
            onChange={(e) =>
              setMessage((prev) => ({ ...prev, content: e.target.value }))
            }
            value={message.content}
            className={`block max-h-[300px] mx-4 p-2.5 bg-transparent border-blue-500 w-full text-sm text-gray-900 rounded-full border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              message.content.trim() === "" ? "resize-none" : "resize"
            }`}
            placeholder="Message ChatBot..."
          ></textarea>

          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              type="submit"
              ref={sendMessageRef}
              disabled={message.content.trim() === ""}
              className={`inline-flex justify-center p-2 bg-blue-300 rounded-full cursor-pointer ${
                message.content.trim() === "" && "bg-gray-300"
              }`}
            >
              <svg
                className={`w-6 h-6 text-gray-800 ${
                  message.content.trim() === "" && "text-gray-400"
                }`}
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
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>

              {<span className="sr-only">Send message</span>}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
