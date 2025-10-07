import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { UserQuery } from "@/helpers/types";
import { UserPhoto } from "./UserPhoto";

const userLineVariants = cva([], {
	variants: {
		intent: {
			primary: ["flex", "items-center", "gap-6", "my-1.5"],
			profile: ["flex", "gap-4"],
			button: ["cursor-pointer"],
			info: ["flex", "gap-2"],
		},
	},
});

export interface UserLineVariants
	extends VariantProps<typeof userLineVariants> {}

export const userLine = (variants: UserLineVariants) =>
	twMerge(userLineVariants(variants));

interface UserLineProps extends UserLineVariants {
	user: UserQuery;
	onClick: (id: number) => void;
}

export function UserLine({ user, onClick }: UserLineProps) {
	const fullName = `${user.firstName} 
				${user.lastName}`;
	const initials = `${user.firstName[0]}${user.lastName[0]}`;

	return (
		<div className={userLine({ intent: "primary" })}>
			<div className={userLine({ intent: "profile" })}>
				{user.children ? (
					<button
						type="button"
						className={userLine({ intent: "button" })}
						onClick={(e) => {
							e.stopPropagation();
							onClick(user.id);
						}}
					>
						+
					</button>
				) : (
					<div>-</div>
				)}
				<UserPhoto src={user.photo} initials={initials} />
			</div>
			<div className={userLine({ intent: "info" })}>
				<p>{fullName}</p>
				<p>{user.email}</p>
			</div>
		</div>
	);
}
