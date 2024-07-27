export class Project {
	id: string;
	name: string | undefined;
	description: string | undefined;

	constructor(
		id: string,
		name: string | undefined,
		description: string | undefined,
	) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}
