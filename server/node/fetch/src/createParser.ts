import { createParser } from "eventsource-parser";

async function main() {
  console.log("Hello, world!", process.env.OPENAI_API_KEY);

  const fetchResult = await fetch(
    `${process.env.OPENAI_PROXY_BASE_URL}/chat/completions`,
    {
      headers: {
        accept: "text/event-stream",
        authorization: `Bearer ${process.env.OPENAI_PROXY_API_KEY}`,
        "cache-control": "no-cache",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        stream: true,
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: "9.11 和 9.9 谁大？",
          },
        ],
      }),
      method: "POST",
    }
  );

  if (!fetchResult.body) {
    throw new Error("fetchResult.body is null");
  }

  const parser = createParser({
    onEvent: (event) => {
      console.log("event", event);
    },
  });

  const decoder = new TextDecoder();

  for await (const chunk of fetchResult.body as unknown as IterableIterator<Uint8Array>) {
    parser.feed(decoder.decode(chunk));
  }
}

main().catch(console.error);
