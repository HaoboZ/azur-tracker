'use client';
import { alpha, autocompleteClasses, styled } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';
import { forwardRef } from 'react';
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso';

const Listbox = styled('div')(({ theme }) => ({
	listStyle: 'none',
	margin: 0,
	padding: 0,
	maxHeight: '40vh',
	overflow: 'auto',
	position: 'relative',
	[`& .${autocompleteClasses.option}`]: {
		'minHeight': 48,
		'display': 'flex',
		'overflow': 'hidden',
		'justifyContent': 'flex-start',
		'alignItems': 'center',
		'cursor': 'pointer',
		'paddingTop': 6,
		'boxSizing': 'border-box',
		'outline': '0',
		'WebkitTapHighlightColor': 'transparent',
		'paddingBottom': 6,
		'paddingLeft': 16,
		'paddingRight': 16,
		[theme.breakpoints.up('sm')]: {
			minHeight: 'auto',
		},
		[`&.${autocompleteClasses.focused}`]: {
			'backgroundColor': theme.palette.action.hover,
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
		'&[aria-disabled="true"]': {
			opacity: theme.palette.action.disabledOpacity,
			pointerEvents: 'none',
		},
		[`&.${autocompleteClasses.focusVisible}`]: {
			backgroundColor: theme.palette.action.focus,
		},
		'&[aria-selected="true"]': {
			backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
			[`&.${autocompleteClasses.focused}`]: {
				'backgroundColor': alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				'@media (hover: none)': {
					backgroundColor: theme.palette.action.selected,
				},
			},
			[`&.${autocompleteClasses.focusVisible}`]: {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
				),
			},
		},
	},
}));

export const VirtualListbox = forwardRef<HTMLDivElement, { children: ReactNode[] }>(
	({ children }, ref) => (
		<Listbox ref={ref}>
			<Virtuoso style={{ height: '40vh' }} data={children} itemContent={(_, item) => item} />
		</Listbox>
	),
);

export const VirtualGroupedListbox = forwardRef<HTMLDivElement, { children: ReactElement[] }>(
	({ children }, ref) => {
		const items = children.flatMap(({ props }) => props.children[1].props.children);

		return (
			<Listbox ref={ref}>
				<GroupedVirtuoso
					style={{ height: '40vh' }}
					groupCounts={children.map(({ props }) => props.children[1].props.children.length)}
					groupContent={(index) => children[index].props.children[0]}
					itemContent={(index) => items[index]}
				/>
			</Listbox>
		);
	},
);
