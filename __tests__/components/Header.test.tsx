import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../../src/components/Header';
import { renderWithTheme } from '../../test-utils';

describe('Header', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('dark');
	});

	it('should render', () => {
		renderWithTheme(<Header />);
		const elem = screen.getByTestId('header');
		expect(elem).toBeInTheDocument();
	});

	it('adds .dark class and updates localStorage when toggling to dark mode', async () => {
		renderWithTheme(<Header />);
		const button = screen.getByRole('button', { name: 'Switch to dark mode' });
		await userEvent.click(button);
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('color-mode')).toBe('dark');
	});

	it('removes .dark class and updates localStorage when toggling back to light mode', async () => {
		renderWithTheme(<Header />);
		const button = screen.getByRole('button', { name: 'Switch to dark mode' });
		await userEvent.click(button);
		const lightButton = screen.getByRole('button', { name: 'Switch to light mode' });
		await userEvent.click(lightButton);
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('color-mode')).toBe('light');
	});

	it('initialises as dark when localStorage has color-mode=dark', () => {
		localStorage.setItem('color-mode', 'dark');
		renderWithTheme(<Header />);
		expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
	});
});
