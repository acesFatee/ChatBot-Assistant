import ChatArea from "@/components/ChatArea";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-sample-prompts`, {
    method: "GET",
    cache: 'no-store'
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
