export function UserPhoto({
	initials,
	src,
}: {
	initials: string;
	src?: string;
}) {
	return (
		<>
			{src ? (
				<img
					src={`${src}`}
					alt={`${initials}`}
					className="rounded-full aspect-square w-10 border-2 border-purple-600"
				/>
			) : (
				<div className="flex justify-center items-center border-2 rounded-full aspect-square w-10 border-purple-600">
					<div>{initials}</div>
				</div>
			)}
		</>
	);
}
