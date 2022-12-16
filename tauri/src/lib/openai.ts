import { Body, getClient } from "@tauri-apps/api/http";
import { get, writable } from "svelte/store";
import type { ResponseDTO, RequestDTO, MessageLength } from "./types";

export const question = writable("")
export const answer = writable("")
export const waiting = writable(false)

export function call () {
	answer.set("")
	// completion()
	// sentimental()
	// sentimental2()
	// generation()
	// conversation("長文で自己紹介をお願いします")
	// conversation2("最初の飛行機が飛んだのはいつですか")
	// translations()
	// emoji("今日は晴れています。山に登ります。")
	summarization()
	// getCard()
}

export async function template () {
	question.set(`

	`)

	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}

export async function summarization () {
	question.set(`
小学2年生のためにこれを要約します。
木星は太陽から 5 番目の惑星であり、太陽系で最大です。質量は太陽の 1000 分の 1 ですが、太陽系の他のすべての惑星を合わせた質量の 2.5 倍の巨大ガス惑星です。木星は、夜空で肉眼で見える最も明るい天体の 1 つであり、有史以前から古代文明に知られていました。ローマの神ユピテルにちなんで名付けられた[19]。地球から見ると、木星はその反射光が目に見える影を落とすのに十分なほど明るく[20]、夜空で月と金星に次いで平均して3番目に明るい自然物体です。
	`)

	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}

export async function emoji (msg: string) {
	question.set(`
この文章を絵文字で表現してください: ${msg}
	`)

	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}

export async function translations () {
	question.set(`
	これをフランス語、スペイン語、英語に翻訳してください: どの部屋が空いていますか?
	`)

	return completionsApi({ model: "text-davinci-003", prompt: get(question), max_tokens: 128 })
}

export async function conversation2 (msg:string) {
	question.set(`
Marv は、皮肉な応答で質問に答えるチャットボットです。

人間: ${msg}
Marv: 
	`)
	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}
export async function conversation (msg:string) {
	question.set(`
以下はAIアシスタントとの会話です。アシスタントは親切で、創造的で、賢く、とてもフレンドリーです。

人間: ${msg}
AI: 
	`)
	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
}
export async function generation () {
	question.set(`
VR とフィットネスを組み合わせたアイデアをブレインストーミングします。
	`)
	return completionsApi({ model: "text-davinci-003", prompt: get(question) })
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
export async function sentimental2 () {
	question.set(`
これらのツイートの感情を分類してください:

1.「宿題が我慢できない」 
2.「これは最悪だ。退屈だ😠」 
3.「ハロウィーンが待ちきれない!!!」
4.「私の猫はかわいい❤️❤️」 
5.「私はチョコレートが嫌いです」

ツイートのセンチメント評価:
	`)
	return completionsApi({ model: "text-davinci-003", prompt: get(question), })
}
export async function completionsApi(request: RequestDTO) {
	waiting.set(true)
	const client = await getClient();

	const response = await client.post<ResponseDTO>(
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

	answer.update((answer) => `${answer}${choice.text}`)
	waiting.set(false)
}
export async function getCard() {
	const client = await getClient();
	const response = await client.get(
		"https://jjsonplaceholder.appspot.com/cards",
	);

	return response.data;
}
export async function askNext (length: MessageLength = "medium") {
	const prompt = get(question) + get(answer)
	const maxTokens = {
		"medium": 64,
		"long": 254,
		"very-long": 1024,
		"full": 4096,
	}[length]

	return completionsApi({ model: "text-davinci-003", prompt, max_tokens: maxTokens })
}