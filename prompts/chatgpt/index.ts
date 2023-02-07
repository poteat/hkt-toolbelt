import { ChatGPTAPI } from "chatgpt";

async function main() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  let input = "";
  process.stdin.setEncoding("utf8");

  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();
    if (chunk) {
      input += chunk;
    }
  });

  process.stdin.on("end", async () => {
    const res = await api.sendMessage(input);
    console.log(res.text);
    process.exit(0);
  });
}

if (!process.stdin.isTTY) main();
