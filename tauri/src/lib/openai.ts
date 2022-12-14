import { Body, getClient } from "@tauri-apps/api/http";
import { get, writable } from "svelte/store";
import type { Response, Request } from "./dto";

export const question = writable("")
export const answer = writable("")

export function call () {
	answer.set("")
	// completion()
	sentimental()
	// getCard()
}

export async function completion () {
	question.set("アイスクリームショップのキャッチフレーズを書きます。")
	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}
export async function sentimental () {
	question.set(`
次のチャットの感情がポジティブ・ニュートラル・ネガティブのいずれであるかを決定します。

新しいバットマンの映画が大好きです!

感情：
	`)
	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}

export async function completionsApi(request: Request) {
	const client = await getClient();

	const response = await client.post<Response>(
		"https://api.openai.com/v1/completions",

		// https://beta.openai.com/docs/api-reference/completions/create
		Body.json({
			max_tokens: 64, // default 16
			temperature: 1, // default 1
			top_p: 1, // default 1
			...request
		}),
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Charset": "utf-8",
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
		}
	);

	const choice = response.data.choices[0]

	answer.set(choice.text)
}
export async function getCard() {
	const client = await getClient();
	const response = await client.get(
		"https://jjsonplaceholder.appspot.com/cards",
	);

	return response.data;
}