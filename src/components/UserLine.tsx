import type { UserQuery } from "@/helpers/types";
import { UserPhoto } from "./UserPhoto";

export function UserLine({
	user,
	onClick,
}: {
	user: UserQuery;
	onClick: (id: number) => void;
}) {
	const fullName = `${user.firstName} 
				${user.lastName}`;
	const initials = `${user.firstName[0]}${user.lastName[0]}`;

	return (
		<div className="flex items-center gap-3">
			{user.children ? (
				<button
					type="button"
					className="cursor-pointer"
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
			<p>{fullName}</p>
			<p>{user.email}</p>
		</div>
	);
}
