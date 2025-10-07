import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useLogIn } from "@/hooks/useLogIn";

export function Login() {
	const {
		email,
		password,
		isValidEmail,
		isValidPassword,
		error,
		setEmail,
		setPassword,
		handleSubmit,
	} = useLogIn();

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
			{error && (
				<p className="mt-2 text-sm text-red-600">
					There was a problem with logging in
				</p>
			)}
		</div>
	);
}
