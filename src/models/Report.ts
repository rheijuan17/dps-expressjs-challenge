export class Report {
	id: string;
	text: string;
	projectid: string;

	constructor(id: string, text: string | undefined, projectid: string) {
		this.id = id;
		this.text = text ? text : '';
		this.projectid = projectid;
	}
}
