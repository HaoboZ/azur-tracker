import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogProps,
	DialogTitle,
	Grow,
	GrowProps,
	IconButton,
	SwipeableDrawer,
	SwipeableDrawerProps,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery
} from '@mui/material';
import React from 'react';

const Transition = React.forwardRef( ( props: GrowProps, ref: React.ForwardedRef<typeof Grow> ) =>
	<Grow ref={ref} {...props}/> );

export enum ModalVariant {
	adaptive = 'adaptive',
	bottom   = 'bottom',
	center   = 'center'
}

export type PageModalProps = {
	open: boolean,
	onClose: () => void,
	// type of modal to be displayed
	variant?: ModalVariant,
	children?: React.ReactNode
} & Partial<Omit<SwipeableDrawerProps & DialogProps, 'open' | 'onClose' | 'variant' | 'children'>>;

export default function PageModal( { variant = ModalVariant.adaptive, children, ...props }: PageModalProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	if ( variant === ModalVariant.center || variant === ModalVariant.adaptive && wide ) {
		return <Dialog
			maxWidth='md'
			fullWidth
			TransitionComponent={Transition}
			disablePortal
			closeAfterTransition
			sx={{
				'& .MuiDialog-paper': {
					ml: 'env(safe-area-inset-left)',
					mr: 'env(safe-area-inset-right)',
					mt: 'env(safe-area-inset-top)',
					mb: 'env(safe-area-inset-bottom)'
				}
			}}
			{...props}>
			{children}
		</Dialog>;
	} else {
		return <SwipeableDrawer
			anchor='bottom'
			onOpen={() => null}
			disableSwipeToOpen
			disablePortal
			closeAfterTransition
			sx={{ display: 'flex', justifyContent: 'center' }}
			PaperProps={{
				sx: {
					maxWidth            : '100%',
					maxHeight           : 'calc(100vh - env(safe-area-inset-top) - 32px)',
					height              : variant === ModalVariant.bottom ? 'auto' : '100%',
					left                : 'auto',
					right               : 'auto',
					borderTopLeftRadius : 12,
					borderTopRightRadius: 12,
					width               : ( { breakpoints } ) => breakpoints.values.md
				}
			}}
			{...props}>
			{children}
		</SwipeableDrawer>;
	}
}

export function PageModalContainer( {
	onClose,
	variant = ModalVariant.adaptive,
	title,
	onSave,
	keepOpenOnSave,
	children
}: {
	onClose: () => void,
	// type of modal to be displayed
	variant?: ModalVariant,
	title?: React.ReactNode,
	// renders and called by save button if set
	onSave?: () => void,
	keepOpenOnSave?: boolean,
	children?: React.ReactNode
} ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	if ( variant === ModalVariant.center || variant === ModalVariant.adaptive && wide ) {
		return <>
			{title && <DialogTitle>{title}</DialogTitle>}
			{children}
			<DialogActions>
				{onSave ? <Button
					variant='contained'
					onClick={async () => {
						await onSave();
						!keepOpenOnSave && onClose();
					}}>
					Save
				</Button> : undefined}
				<Button variant='contained' color='error' onClick={onClose}>
					{onSave ? 'Cancel' : 'Close'}
				</Button>
			</DialogActions>
		</>;
	} else {
		return <>
			<Toolbar>
				<IconButton edge='start' color='inherit' onClick={onClose}>
					<ArrowBackIcon/>
				</IconButton>
				<Typography variant='h6' flexGrow={1}>
					{title}
				</Typography>
				{onSave ? <Button
					variant='contained'
					onClick={async () => {
						await onSave();
						!keepOpenOnSave && onClose();
					}}>Save</Button> : undefined}
			</Toolbar>
			{children}
		</>;
	}
}
