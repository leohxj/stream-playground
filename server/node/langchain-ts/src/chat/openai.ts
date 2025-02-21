import { ChatOpenAI } from "@langchain/openai";

async function main() {
  // use a proxy API endpoint
  const openai = new ChatOpenAI({
    modelName: "gpt-4o",
    apiKey: process.env.OPENAI_PROXY_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_PROXY_BASE_URL,
    },
  });

  const result = await openai.invoke("What is the capital of France?");
  console.log("result", result);
}

main().catch(console.error);
