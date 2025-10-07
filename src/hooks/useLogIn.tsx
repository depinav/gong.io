import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { encode } from "@/helpers/utils";
import { useLoginQuery } from "./useLoginQuery";

const emailTester = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function useLogIn() {
	const queryClient = useQueryClient();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);
	const [secret, setSecret] = useState<string | null>(null);
	const [error, setError] = useState(false);

	const { data: userId } = useLoginQuery({ secret });

	useEffect(() => {
		if (userId === null) {
			setPassword("");
			setError(true);
		}
	}, [userId]);

	const handleSubmit = () => {
		queryClient.invalidateQueries({ queryKey: ["userId"] });
		setError(false);
		const isEmailValid = email.length > 0 && emailTester.test(email);
		setIsValidEmail(isEmailValid);
		setIsValidPassword(password.length > 0);
		if (isEmailValid && password.length > 0) {
			setSecret(encode(email, password));
		}
	};

	return {
		email,
		password,
		isValidEmail,
		isValidPassword,
		error,
		setEmail,
		setPassword,
		handleSubmit,
	};
}
