import { OpenAI } from "@llamaindex/openai";

async function main() {
  const llm = new OpenAI({
    model: "deepseek-r1-250120",
    apiKey: process.env.BYTEDANCE_PROXY_API_KEY,
    additionalSessionOptions: {
      baseURL: process.env.BYTEDANCE_PROXY_BASE_URL,
    },
  });

  const stream = await llm.chat({
    messages: [
      { content: "You are a helpful assistant.", role: "system" },
      { content: "9.11 和 9.9 谁大？", role: "user" },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    // 没有带出 reasoning 信息
    // console.log("chunk", chunk);
    console.log("chunk.delta", (chunk.raw as any).choices?.[0]?.delta);
    // process.stdout.write(chunk.delta);
  }
}

main().catch(console.error);
