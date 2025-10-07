import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/api";

export function useUsers({ userId }: { userId: string }) {
	return useQuery({
		queryKey: ["users", userId],
		queryFn: () => getUsers(),
		enabled: !!userId,
		staleTime: Infinity,
	});
}
