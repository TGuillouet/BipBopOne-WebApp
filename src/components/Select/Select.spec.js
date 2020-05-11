import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import Select from './Select';

describe('Select', () => {
	let container = null;

	beforeEach(() => {
		// met en place un élément DOM comme cible de rendu
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		// nettoie en sortie de test
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	it('The placeholder should not be empty', () => {
		let { getByPlaceholderText } = render(
			<Select name="testSelect" defaultValue="test2" placeholder="myPlaceholder">
				<option value="test">Test1</option>
				<option value="test2">Test2</option>
			</Select>,
			container
		);

		expect(getByPlaceholderText('myPlaceholder')).toBeInTheDocument();
	});

	it('should have the specified name', () => {
		const { getByPlaceholderText } = render(
			<Select name="testSelect" defaultValue="test2" placeholder="test">
				<option value="test">Test1</option>
				<option value="test2">Test2</option>
			</Select>,
			container
		);

		const select = getByPlaceholderText('test');

		expect(select.name).toBe('testSelect');
	});

	it("should be default to 'test2'", () => {
		const { getByPlaceholderText } = render(
			<Select name="testSelect" defaultValue="test2" placeholder="test">
				<option value="test">Test1</option>
				<option value="test2">Test2</option>
			</Select>,
			container
		);

		const select = getByPlaceholderText('test');

		expect(select.value).toBe('test2');
	});

	it("should be change to 'test1'", () => {
		const changeEvent = {
			preventDefault: () => {},
			target: { name: 'testSelect', value: 'test' }
		};

		const { getByPlaceholderText } = render(
			<Select name="testSelect" defaultValue="test2" placeholder="test">
				<option value="test">Test1</option>
				<option value="test2">Test2</option>
			</Select>,
			container
		);

		const select = getByPlaceholderText('test');

		expect(select.value).toBe('test2');

		fireEvent.change(select, changeEvent);

		expect(select.value).toBe('test');
	});
});
