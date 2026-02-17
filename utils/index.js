export function getStartOfWeek() {
	const now = new Date();
	const day = now.getDay();

	const adjustedDay = day === 0 ? 7 : day;

	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - (adjustedDay - 1));
	startOfWeek.setHours(0, 0, 0, 0);

	return startOfWeek;
}
export function getEndOfWeek() {
	const startOfWeek = getStartOfWeek();
	const endOfWeek = new Date(startOfWeek);

	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	return endOfWeek;
}
