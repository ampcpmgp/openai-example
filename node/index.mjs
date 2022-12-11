import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function emotion () {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `チャットの感情がポジティブ、ネガティブ、ニュートラルのいずれかを決定します。

		チャット：全日ずっと待機してなければいけないわけじゃなくて、ある特定の日、おそらく平日に、2〜3時間ほどこちらの意志に関係なく行かなければならない日がある、という認識です。
		
		感情：`,
		temperature: 0,
		max_tokens: 7,
	});

	/**
	response.data
	{
		id: 'cmpl-6M8RpQhbUbfv9k6qAELDO8256z2rO',
		object: 'text_completion',
		created: 1670733709,
		model: 'text-davinci-003',
		choices: [
			{ text: 'ニュートラル', index: 0, logprobs: null, finish_reason: 'stop' }
		],
		usage: { prompt_tokens: 180, completion_tokens: 6, total_tokens: 186 }
	}
	 */
	console.log(response.data);
}

// emotion()
