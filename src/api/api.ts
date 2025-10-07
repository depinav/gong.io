import type { User } from "@/helpers/types";

const baseUrl = "https://gongfetest.firebaseio.com/";

export async function login(secret: string): Promise<string | null> {
	const response = await fetch(`${baseUrl}secrets/${secret}.json`);

	if (!response.ok) {
		throw new Error("There was a problem with logging in.");
	}

	const userId: string | null = await response.json();

	return userId;
}

export async function getUsers(): Promise<User[]> {
	const response = await fetch(`${baseUrl}users.json`);

	if (!response.ok) {
		throw new Error("There was a problem with logging in.");
	}

	return await response.json();
}
