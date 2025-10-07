import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
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
	const [hasImage, setHasImage] = useState(false);

	useEffect(() => {
		if (src) {
			const img = new Image();
			img.src = src;
			img.onload = () => setHasImage(true);
		}
	}, [src]);

	return (
		<>
			{hasImage ? (
				<img src={`${src}`} alt={`${initials}`} className={userPhoto({})} />
			) : (
				<div className={userPhoto({ intent: "initials" })}>
					<div>{initials}</div>
				</div>
			)}
		</>
	);
}
