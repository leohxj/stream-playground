import OpenAI from "openai";

async function main() {
  const client = new OpenAI({
    apiKey: process.env["OPENAI_PROXY_API_KEY"], // This is the default and can be omitted
    baseURL: process.env["OPENAI_PROXY_BASE_URL"],
  });

  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });

  for await (const chunk of stream) {
    console.log("\n===chunk:", chunk);
    console.log("chunk.choices[0]?.delta?.content:", chunk.choices[0]?.delta);
    // process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main().catch(console.error);
