import { UserList } from "@/components/UserList";
import type { User } from "@/helpers/types";
import { mapUserHierarchy } from "@/helpers/utils";
import { useLoginQuery } from "@/hooks/useLoginQuery";
import { useUsers } from "@/hooks/useUsers";

function mapUsers(users: User[]) {
	const { manager = [], ...rest } = Object.groupBy(
		users,
		(user) => user.managerId || "manager",
	);

	return mapUserHierarchy(manager, rest);
}

export function Hierarchy() {
	const { data: userId } = useLoginQuery({ secret: null });
	const { data: users } = useUsers({ userId: userId || "" });

	const loggedInUser = users?.find(
		(user) => user.id === parseInt(userId || "", 10),
	);

	return (
		<div className="flex flex-col w-2xl">
			<div className="flex self-end gap-2">
				<p>
					{loggedInUser?.firstName} {loggedInUser?.lastName}
				</p>
				<div>
					(<a href="/">Logout</a>)
				</div>
			</div>
			<h1 className="text-3xl">Hierarchy Tree</h1>
			{users && <UserList users={mapUsers(users)} />}
		</div>
	);
}
