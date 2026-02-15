import { faker } from "@faker-js/faker";
import Note from "../models/Note.js";

const colorsList = [
	{
		id: "color-yellow",
		colorHeader: "#FFEFBE",
		colorBody: "#FFF5DF",
		colorText: "#18181A",
	},
	{
		id: "color-green",
		colorHeader: "#AFDA9F",
		colorBody: "#BCDEAF",
		colorText: "#18181A",
	},
	{
		id: "color-blue",
		colorHeader: "#9BD1DE",
		colorBody: "#A6DCE9",
		colorText: "#18181A",
	},
	{
		id: "color-purple",
		colorHeader: "#FED0FD",
		colorBody: "#FEE5FD",
		colorText: "#18181A",
	},
];

export async function seedNotes(users, count = 20) {
	const notes = [];

	for (let i = 0; i < count; i++) {
		const randomUser = faker.helpers.arrayElement(users);
		const randomColor = faker.helpers.arrayElement(colorsList);

		const note = await Note.create({
			body: JSON.stringify(
				faker.lorem.sentence({
					min: 8,
					max: 32,
				}),
			),

			colors: JSON.stringify(randomColor),

			position: JSON.stringify({
				x: faker.number.int({ min: 0, max: 800 }),
				y: faker.number.int({ min: 0, max: 600 }),
			}),

			user_id: randomUser._id,
		});

		notes.push(note);
	}

	console.log(`✅ Seeded ${count} notes`);
	return notes;
}
