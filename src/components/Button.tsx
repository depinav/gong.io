import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(["font-semibold", "border", "rounded"], {
	variants: {
		intent: {
			primary: ["bg-blue-500", "text-white", "border-transparent"],
		},
		size: {
			small: ["text-sm", "py-1", "px-2"],
			medium: ["text-base", "py-2", "px-4"],
		},
		disabled: {
			false: null,
			true: ["opacity-50", "cursor-not-allowed"],
		},
	},
	defaultVariants: {
		intent: "primary",
		size: "medium",
		disabled: false,
	},
});

export interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

export const button = (variants: ButtonVariants) =>
	twMerge(buttonVariants(variants));

interface ButtonProps extends ButtonVariants {
	children: React.ReactNode;
	onClick: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	disabled?: boolean;
}

export function Button({
	children,
	type,
	intent,
	disabled,
	onClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={button({ intent, disabled })}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
