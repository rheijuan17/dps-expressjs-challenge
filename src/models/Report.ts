export class Report {
	id: string;
	name: string | undefined;
	projectId: string | undefined;

	constructor(id: string, name: string, projectId: string | undefined) {
		this.id = id;
		this.name = name;
		this.projectId = projectId;
	}
}
