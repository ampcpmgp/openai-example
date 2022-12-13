import { Body, getClient } from "@tauri-apps/api/http";
import type { Response, Request } from "./dto";

export function start () {
	// generateText()
	getCard()
}

async function generateText () {
	const data = await completions({ model: "text-davinci-003", prompt: "アイスクリームショップのキャッチフレーズを書きます。" })
	console.info(data.choices)
	console.info(data.choices.map(item => item.text))
}

export async function completions(request: Request) {
	const client = await getClient();
	const response = await client.post<Response>(
		"https://api.openai.com/v1/completions",
		Body.json(request),
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Charset": "utf-8",
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
		}
	);

	return response.data;
}
export async function getCard() {
	const client = await getClient();
	const response = await client.get(
		"https://jjsonplaceholder.appspot.com/cards",
	);

	return response.data;
}