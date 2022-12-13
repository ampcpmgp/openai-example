export interface Request {
	model: "text-davinci-003";
	prompt: string;
}

export interface Response {
	choices: any;
}