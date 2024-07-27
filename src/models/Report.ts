export class Report {
	id: string;
	name: string;
	projectId: string;

	constructor(id: string, name: string, projectId: string) {
		this.id = id;
		this.name = name;
		this.projectId = projectId;
	}
}
