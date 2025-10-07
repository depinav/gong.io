import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./Label";

const inputVariants = cva([], {
	variants: {
		intent: {
			primary: [
				"block",
				"w-full",
				"rounded-md",
				"bg-white",
				"outline-1",
				"-outline-offset-1",
				"focus:outline-2",
				"focus:-outline-offset-2",
			],
			error: ["mt-2", "text-sm", "text-red-600"],
		},
		validation: {
			default: [
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
});

export interface InputVariants extends VariantProps<typeof inputVariants> {}

export const input = (variants: InputVariants) =>
	twMerge(inputVariants(variants));

type InputType = "email" | "text" | "password";

interface InputProps extends InputVariants {
	label: string;
	type?: InputType;
	isValid?: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

export function TextInput({
	label,
	type = "text",
	isValid = true,
	disabled = false,
	onChange,
}: InputProps) {
	const [value, setValue] = useState("");
	const labelFor = `${label.charAt(0).toLowerCase()}${label.slice(1).replaceAll(" ", "")}`;

	return (
		<div data-testid="text-input-container">
			<Label labelFor={labelFor}>{label}</Label>
			<input
				disabled={disabled}
				onChange={(e) => {
					setValue(e.currentTarget.value);
					onChange(e.currentTarget.value);
				}}
				value={value}
				type={type}
				id={labelFor}
				aria-describedby={`${labelFor}-error`}
				className={input({
					intent: "primary",
					validation: isValid ? "default" : "error",
					size: "medium",
				})}
				data-testid="input-field"
			/>
			{!isValid && (
				<p id={`${labelFor}-error`} className={input({ intent: "error" })}>
					Invalid {label}
				</p>
			)}
		</div>
	);
}
