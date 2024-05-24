import ChatArea from "@/components/ChatArea";

export default async function Home() {
  const response = await fetch("http://localhost:5000/get-sample-prompts", {
    method: "GET",
  })
  const data = await response.json();
  let samplePrompts
  try {
    samplePrompts = JSON?.parse(data.result.content)
  } catch (error) {
    samplePrompts = []
  }
  return (
    <>
      <ChatArea samplePrompts={samplePrompts}/>
    </>
  );
}
