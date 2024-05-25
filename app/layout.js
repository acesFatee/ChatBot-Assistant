import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "AI ChatBot",
  description: "ChatBot Assistant is your virtual companion for instant answers and assistance. It helps with daily tasks, creative ideas, and quick information through engaging conversations. Enjoy a seamless and responsive experience with our AI-powered bot, making your day easier and more productive.",
  icons: {
    icon: "/chat-gpt-pfp.webp"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        {children}
        </body>
    </html>
  );
}
