import { Popper } from '@mui/base';
import type { AutocompleteListboxProps } from '@mui/joy';
import { AutocompleteListbox, ListSubheader, Sheet } from '@mui/joy';
import { cloneElement, forwardRef } from 'react';
import type { Components } from 'react-virtuoso';
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso';
import { isEmpty } from 'remeda';

const components: (other) => Components<any, any> = (other) => ({
	Scroller: forwardRef(({ children, ...props }, ref) => (
		<Sheet ref={ref} variant='outlined' sx={{ borderRadius: 6 }} {...props}>
			{children}
		</Sheet>
	)),
	TopItemList: ({ style, ...props }) => <div style={{ ...style, zIndex: 1001 }} {...props} />,
	List: forwardRef(({ style, ...props }, ref) => (
		<AutocompleteListbox
			ref={ref as any}
			variant='plain'
			sx={{ py: 0, maxHeight: 'unset' }}
			style={style}
			{...props}
			{...(isEmpty(style as any) ? other : undefined)}
		/>
	)),
	Group: ListSubheader,
	// @ts-ignore
	Item: ({ item, children, onMouseDown, ...props }) =>
		cloneElement(children as any, { ...props, onMouseDown: (e) => e.preventDefault() }),
});

// Adapter for react-window
export default forwardRef<
	HTMLDivElement,
	{ anchorEl: any; open: boolean; modifiers: any[]; ownerState: any } & AutocompleteListboxProps
>(function VirtualAutocompleteListbox(
	{ children, anchorEl, open, modifiers, style, ownerState, ...other },
	ref,
) {
	const items = ownerState.groupBy
		? children[0].flatMap(({ props }) => props.children[1].props.children)
		: children[0];
	console.log(other);
	return (
		<Popper
			ref={ref}
			anchorEl={anchorEl}
			open={open}
			modifiers={modifiers}
			style={{ zIndex: 1300, height: '40vh' }}>
			{ownerState.groupBy ? (
				<GroupedVirtuoso
					style={style}
					components={components(other)}
					groupCounts={children[0].map(({ props }) => props.children[1].props.children.length)}
					groupContent={(index) => children[0][index].props.children[0].props.children}
					itemContent={(index) => items[index]}
				/>
			) : (
				<Virtuoso
					style={style}
					components={components(other)}
					data={items}
					itemContent={(_, item) => item}
				/>
			)}
		</Popper>
	);
});
