import ChatArea from "@/components/ChatArea";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/get-sample-prompts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await response.json();
  const emergencyArray =  [
    "Tell me a joke",
    "What's the weather like?",
    "Give me a recipe",
    "Share a fun fact"
  ];

  let samplePrompts;
  try {
    samplePrompts = JSON?.parse(data.result.content);
    if (samplePrompts.length === 0) {
      samplePrompts = emergencyArray
    }
  } catch (error) {
    samplePrompts = emergencyArray;
  }
  return (
    <>
      <ChatArea samplePrompts={samplePrompts} />
    </>
  );
}
