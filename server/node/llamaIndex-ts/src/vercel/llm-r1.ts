import { createDeepSeek } from "@ai-sdk/deepseek";
import { VercelLLM } from "@llamaindex/vercel";

async function main() {
  const r1 = createDeepSeek({
    baseURL: process.env.BYTEDANCE_PROXY_BASE_URL,
    apiKey: process.env.BYTEDANCE_PROXY_API_KEY,
  });

  // Create an instance of VercelLLM with the OpenAI model
  const vercelLLM = new VercelLLM({ model: r1("deepseek-r1-250120") });

  console.log("\n=== Test 2: Using chat() for streaming response ===");
  const stream = await vercelLLM.chat({
    messages: [
      { content: "You are a helpful assistant.", role: "system" },
      {
        content: "9.11 和 9.9 谁大？",
        role: "user",
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    // 没有带出 reasoning 信息
    console.log("chunk", chunk);
    // process.stdout.write(chunk.delta);
  }
}

main().catch(console.error);
