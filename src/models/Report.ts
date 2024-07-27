export class Report {
	id: string;
	text: string | undefined;
	projectid: string | undefined;

	constructor(
		id: string,
		text: string | undefined,
		projectid: string | undefined,
	) {
		this.id = id;
		this.text = text;
		this.projectid = projectid;
	}
}
