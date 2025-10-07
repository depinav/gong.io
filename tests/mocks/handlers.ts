import { HttpResponse, http } from "msw";
import { baseUrl } from "@/api/api";
import secrets from "./secrets.json";
import users from "./users.json";

export const handlers = [
	http.get(`${baseUrl}secrets/12345.json`, () => {
		return HttpResponse.json(secrets["12345"]);
	}),
	http.get(`${baseUrl}users.json`, () => {
		return HttpResponse.json(users);
	}),
];
