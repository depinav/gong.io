import { cva, type VariantProps } from "class-variance-authority";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { Spinner } from "@/components/ui/spinner";
import { useLogIn } from "@/hooks/useLogIn";

const loginVariants = cva([], {
	variants: {
		intent: {
			primary: ["border-1", "h-fit", "px-20", "py-4", "rounded-lg"],
			subSection: ["flex", "flex-col", "gap-2"],
			error: ["mt-2", "text-sm", "text-red-600"],
		},
	},
});

export interface LoginVariants extends VariantProps<typeof loginVariants> {}

export const login = (variants: LoginVariants) =>
	twMerge(loginVariants(variants));

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
		<Suspense fallback={<Spinner className="size-8" />}>
			<div className={login({ intent: "primary" })}>
				<h1 data-testid="login-header">Please login</h1>
				<div className={login({ intent: "subSection" })}>
					<TextInput
						isValid={isValidEmail}
						label="Email Address"
						onChange={(value) => setEmail(value)}
					/>
					<TextInput
						isValid={isValidPassword}
						type="password"
						label="Password"
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
					<p className={login({ intent: "error" })}>
						There was a problem with logging in
					</p>
				)}
			</div>
		</Suspense>
	);
}
