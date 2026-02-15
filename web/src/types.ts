export type Note = {
	_id: string;
	body: string;
	colors: string;
	position: string;
	createdAt?: string;
	updatedAt?: string;
	user_id?: string;
};

export type User = {
	_id: string;
	userName: string;
	email: string;
	role: string;
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

export type Stats = {
	total: number;
	withBody: number;
	emptyBody: number;
	createdToday: number;
	createdThisWeek: number;
	updatedToday: number;
};
