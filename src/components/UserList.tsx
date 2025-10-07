import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import type { UserQuery } from "@/helpers/types";
import { UserLine } from "./UserLine";

const userListVariants = cva([], {
	variants: {
		intent: {
			primary: ["flex", "flex-col"],
			children: ["ml-6"],
		},
		toggle: {
			expanded: ["block"],
			collapsed: ["hidden"],
		},
	},
});

export interface UserListVariants
	extends VariantProps<typeof userListVariants> {}

export const userList = (variants: UserListVariants) =>
	twMerge(userListVariants(variants));

interface UserListProps extends UserListVariants {
	users: UserQuery[];
}

function handleToggleMap(users: UserQuery[]) {
	let toggleMap: { [key: number]: boolean } = {};
	for (const user of users) {
		if (user.children) {
			toggleMap = {
				...toggleMap,
				[user.id]: true,
				...handleToggleMap(user.children),
			};
		}
	}
	return toggleMap;
}

export function UserList({ users }: UserListProps) {
	const [usersToggle, setUsersToggle] = useState(() => handleToggleMap(users));

	const handleToggleClick = (id: number) => {
		const toggleState = usersToggle[id];
		setUsersToggle((prev) => ({ ...prev, [id]: !toggleState }));
	};

	return users.map((user) => {
		return (
			<div key={user.id} className={userList({ intent: "primary" })}>
				<UserLine user={user} onClick={handleToggleClick} />
				{user.children && (
					<div
						className={userList({
							intent: "children",
							toggle: usersToggle[user.id] ? "expanded" : "collapsed",
						})}
					>
						<UserList users={user.children} />
					</div>
				)}
			</div>
		);
	});
}
