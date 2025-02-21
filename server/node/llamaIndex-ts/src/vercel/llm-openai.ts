import { createOpenAI } from "@ai-sdk/openai";
import { VercelLLM } from "@llamaindex/vercel";

async function main() {
  // use a proxy API endpoint
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_PROXY_BASE_URL,
    apiKey: process.env.OPENAI_PROXY_API_KEY,
  });

  // Create an instance of VercelLLM with the OpenAI model
  const vercelLLM = new VercelLLM({ model: openai("gpt-4o") });

  console.log("\n=== Test 1: Using complete() for single response ===");
  const result = await vercelLLM.complete({
    prompt: "What is the capital of France?",
    stream: false, // Set to true if you want streaming responses
  });
  console.log(result.text);

  console.log("\n=== Test 2: Using chat() for streaming response ===");
  const stream = await vercelLLM.chat({
    messages: [
      { content: "You want to talk in rhymes.", role: "system" },
      {
        content:
          "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
        role: "user",
      },
    ],
    stream: true,
  });
  for await (const chunk of stream) {
    console.log("chunk", chunk);
    process.stdout.write(chunk.delta);
  }
}

main().catch(console.error);
