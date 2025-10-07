import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva([
	"block",
	"text-sm/6",
	"font-medium",
	"text-gray-900",
]);

export interface LabelVariants extends VariantProps<typeof labelVariants> {}

export const label = (variants: LabelVariants) =>
	twMerge(labelVariants(variants));

interface LabelProps extends LabelVariants {
	children: React.ReactNode;
	labelFor: string;
}

export function Label({ labelFor, children }: LabelProps) {
	return (
		<label htmlFor={labelFor} className={label({})}>
			{children}
		</label>
	);
}
