import { describe, beforeEach, test, expect } from '@jest/globals';
import { Report } from '../../src/models/Report';
import { v4 as uuid } from 'uuid';

describe('models/project', () => {
	let report: Report;
	const text = 'Test Report';
	const projectid = 'SAMPLE_PROJECT_ID';
	const id = uuid();

	beforeEach(() => {
		report = new Report(id, text, projectid);
	});

	test('should create new report from attributes', () => {
		const _report = new Report(id, text, projectid);
		expect(_report).toEqual(report);
	});

	test('should make text an empty string when given undefined values', () => {
		const _report = new Report(id, undefined, projectid);
		report = new Report(id, '', projectid);

		expect(_report).toEqual(report);
	});
});
