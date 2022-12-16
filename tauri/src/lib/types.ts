export interface RequestDTO {
	model: "text-davinci-003";
	prompt: string;
	max_tokens?: number;
	temperature?: number;
	top_p?: number;
}

export interface ResponseDTO {
	choices: any;
}

export type MessageLength = "medium" | "long" | "very-long" | "full";