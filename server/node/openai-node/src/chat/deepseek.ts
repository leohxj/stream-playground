import OpenAI from "openai";

async function main() {
  const client = new OpenAI({
    apiKey: process.env["BYTEDANCE_PROXY_API_KEY"], // This is the default and can be omitted
    baseURL: process.env["BYTEDANCE_PROXY_BASE_URL"],
  });

  const stream = await client.chat.completions.create({
    model: "deepseek-r1-250120",
    messages: [{ role: "user", content: "9.11 和 9.9 谁大？" }],
    stream: true,
  });

  for await (const chunk of stream) {
    // console.log("\n===chunk:", chunk);

    // reasoning_content 是推理过程
    console.log("chunk.choices[0]?.delta?.content:", chunk.choices[0]?.delta);
  }
}

main().catch(console.error);
