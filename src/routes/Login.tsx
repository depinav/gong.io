import { useState } from "react";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { encode } from "@/helpers/utils";

const emailTester = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidPassword, setIsValidPassword] = useState(true);

	const handleSubmit = () => {
		setIsValidEmail(email.length > 0 && emailTester.test(email));
		setIsValidPassword(password.length > 0);
		if (email.length > 0 && password.length > 0) {
			const encoded = encode(email, password);
			console.log("🚀 ~ handleSubmit ~ encoded:", encoded);
		}
	};

	return (
		<div className="border-1 h-fit px-20 py-4 rounded-lg">
			<h1 className="text-3xl">Please login</h1>
			<div className="flex flex-col gap-2">
				<TextInput
					isValid={isValidEmail}
					label="Email Address"
					value={email}
					onChange={(value) => setEmail(value)}
				/>
				<TextInput
					isValid={isValidPassword}
					type="password"
					label="Password"
					value={password}
					onChange={(value) => setPassword(value)}
				/>
				<Button
					onClick={handleSubmit}
					disabled={email.length <= 0 || password.length <= 0}
				>
					Login
				</Button>
			</div>
		</div>
	);
}
