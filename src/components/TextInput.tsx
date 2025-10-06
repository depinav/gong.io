import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Label } from "./Label";

const inputVariants = cva(
	[
		"block",
		"w-full",
		"rounded-md",
		"bg-white",
		"outline-1",
		"-outline-offset-1",
		"focus:outline-2",
		"focus:-outline-offset-2",
	],
	{
		variants: {
			intent: {
				primary: [
					"text-base",
					"text-gray-900",
					"outline-gray-300",
					"placeholder:text-gray-400",
					"focus:outline-indigo-600",
				],
				error: [
					"col-start-1",
					"row-start-1",
					"pr-10",
					"text-red-900",
					"outline-red-300",
					"placeholder:text-red-300",
					"focus:outline-red-600",
				],
			},
			size: {
				small: ["pr-9, text-sm/6"],
				medium: ["py-1.5", "px-3"],
			},
		},
		defaultVariants: {
			intent: "primary",
			size: "medium",
		},
	},
);

export interface InputVariants extends VariantProps<typeof inputVariants> {}

export const input = (variants: InputVariants) =>
	twMerge(inputVariants(variants));

type InputType = "email" | "text" | "password";

interface InputProps extends InputVariants {
	label: string;
	type?: InputType;
	value: string;
	isValid?: boolean;
	onChange: (value: string) => void;
}

export function TextInput({
	label,
	type = "text",
	intent,
	value,
	isValid = true,
	onChange,
}: InputProps) {
	const labelFor = `${label.charAt(0).toLowerCase()}${label.slice(1).replaceAll(" ", "")}`;

	return (
		<div>
			<Label labelFor={labelFor}>{label}</Label>
			<input
				onChange={(e) => onChange(e.currentTarget.value)}
				value={value}
				type={type}
				id={labelFor}
				aria-describedby={`${labelFor}-error`}
				className={input({ intent: isValid ? intent : "error" })}
			/>
			{!isValid && (
				<p id={`${labelFor}-error`} className="mt-2 text-sm text-red-600">
					Invalid {label}.
				</p>
			)}
		</div>
	);
}
