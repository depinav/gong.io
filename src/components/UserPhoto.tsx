import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const userPhotoVariants = cva(
	["rounded-full", "aspect-square", "w-10", "border-2", "border-purple-600"],
	{
		variants: {
			intent: {
				initials: ["flex", "justify-center", "items-center"],
			},
		},
	},
);

export interface UserPhotoVariants
	extends VariantProps<typeof userPhotoVariants> {}

export const userPhoto = (variants: UserPhotoVariants) =>
	twMerge(userPhotoVariants(variants));

interface UserPhotoProps extends UserPhotoVariants {
	initials: string;
	src?: string;
}

export function UserPhoto({ initials, src }: UserPhotoProps) {
	return (
		<>
			{src ? (
				<img src={`${src}`} alt={`${initials}`} className={userPhoto({})} />
			) : (
				<div className={userPhoto({ intent: "initials" })}>
					<div>{initials}</div>
				</div>
			)}
		</>
	);
}
