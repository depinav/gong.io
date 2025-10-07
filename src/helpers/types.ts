export type User = {
	email: string;
	firstName: string;
	id: number;
	lastName: string;
	photo?: string;
	managerId?: number;
};

export interface UserQuery extends User {
	children?: UserQuery[];
	isOpen?: boolean;
}
