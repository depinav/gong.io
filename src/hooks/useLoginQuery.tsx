import { useQuery } from "@tanstack/react-query";
import { login } from "@/api/api";

export function useLoginQuery({ secret }: { secret: string | null }) {
	return useQuery({
		queryKey: ["userId"],
		queryFn: () => login(secret as string),
		enabled: !!secret,
		staleTime: Infinity,
	});
}
