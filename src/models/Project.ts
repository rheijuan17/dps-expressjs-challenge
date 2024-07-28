export class Project {
	id: string;
	name: string;
	description: string;

	constructor(
		id: string,
		name: string | undefined,
		description: string | undefined,
	) {
		this.id = id;
		this.name = name ? name : '';
		this.description = description ? description : '';
	}
}
