import { useState } from "react";
import type { UserQuery } from "@/helpers/types";
import { UserLine } from "./UserLine";

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

export function UserList({ users }: { users: UserQuery[] }) {
	const [usersToggle, setUsersToggle] = useState(() => handleToggleMap(users));

	const handleToggleClick = (id: number) => {
		const toggleState = usersToggle[id];
		setUsersToggle((prev) => ({ ...prev, [id]: !toggleState }));
	};

	return users.map((user) => {
		return (
			<div key={user.id} className="flex flex-col gap-3.5">
				<UserLine user={user} onClick={handleToggleClick} />
				{user.children && usersToggle[user.id] && (
					<div className="ml-6">
						<UserList users={user.children} />
					</div>
				)}
			</div>
		);
	});
}
