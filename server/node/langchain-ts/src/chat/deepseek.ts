import { ChatDeepSeek } from "@langchain/deepseek";

async function main() {
	// use a proxy API endpoint
	const llm = new ChatDeepSeek({
		modelName: "deepseek-r1-250120",
		apiKey: process.env.BYTEDANCE_PROXY_API_KEY,
		configuration: {
			baseURL: process.env.BYTEDANCE_PROXY_BASE_URL,
		},
	});

	const result = await llm.stream([
		["system", "You are a helpful assistant."],
		["human", "9.11 和 9.9 谁大？"],
	]);

	for await (const chunk of result) {
		// AIMessageChunk
		console.log("chunk", chunk);
	}
}

main().catch(console.error);
