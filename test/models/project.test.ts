import { describe, beforeEach, test, expect } from '@jest/globals';
import { Project } from '../../src/models/Project';
import { v4 as uuid } from 'uuid';

describe('models/project', () => {
	let project: Project;
	const name = 'Test Project';
	const description = 'Test Description';
	const id = uuid();

	beforeEach(() => {
		project = new Project(id, name, description);
	});

	test('should create new project from attributes', () => {
		const _project = new Project(id, name, description);
		expect(_project).toEqual(project);
	});

	test('should make name and description empty strings when given undefined values', () => {
		const _project = new Project(id, undefined, undefined);
		project = new Project(id, '', '');

		expect(_project).toEqual(project);
	});
});
