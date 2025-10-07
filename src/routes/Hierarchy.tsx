import { useQueryClient } from "@tanstack/react-query";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { UserList } from "@/components/UserList";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/helpers/types";
import { mapUserHierarchy } from "@/helpers/utils";
import { useLoginQuery } from "@/hooks/useLoginQuery";
import { useUsers } from "@/hooks/useUsers";

const hierarchyVariants = cva([], {
	variants: {
		intent: {
			primary: ["flex", "flex-col", "w-2xl"],
			logout: ["flex", "self-end", "gap-2"],
		},
	},
});

export interface HierarchyVariants
	extends VariantProps<typeof hierarchyVariants> {}

export const hierarchy = (variants: HierarchyVariants) =>
	twMerge(hierarchyVariants(variants));

function mapUsers(users: User[]) {
	const { manager = [], ...rest } = Object.groupBy(
		users,
		(user) => user.managerId || "manager",
	);

	return mapUserHierarchy(manager, rest);
}

export function Hierarchy() {
	const queryClient = useQueryClient();
	const { data: userId } = useLoginQuery({ secret: null });
	const { data: users, isFetching } = useUsers({ userId: userId || "" });

	const loggedInUser = users?.find(
		(user) => user.id === parseInt(userId || "", 10),
	);

	const handleLogout = () => {
		window.localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
		window.localStorage.removeItem("secret");
		queryClient.invalidateQueries({ queryKey: ["userId", userId] });
	};

	return (
		<div className={hierarchy({ intent: "primary" })}>
			<div className={hierarchy({ intent: "logout" })}>
				<p>
					{loggedInUser?.firstName} {loggedInUser?.lastName}
				</p>
				<div>
					(
					<a href="/" onClick={handleLogout}>
						Logout
					</a>
					)
				</div>
			</div>
			<h1>Hierarchy Tree</h1>
			{isFetching && <Spinner className="size-8" />}
			{users && <UserList users={mapUsers(users)} />}
		</div>
	);
}
