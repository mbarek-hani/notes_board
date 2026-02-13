export type Note = {
	_id: string;
	body: string;
	colors: string;
	position: string;
};

export type Position = {
	x: number;
	y: number;
};

export type Colors = {
	id: string;
	colorHeader: string;
	colorBody: string;
	colorText: string;
};
