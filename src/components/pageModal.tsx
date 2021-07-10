import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	ModalProps,
	Slide,
	SwipeableDrawer,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { SlideProps } from '@material-ui/core/Slide';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React from 'react';

const Transition = React.forwardRef( ( props: SlideProps, ref: React.ForwardedRef<typeof Slide> ) =>
	<Slide direction='up' ref={ref} {...props}/> );

export default function PageModal( { onClose, fitSize, children, ...props }: {
	open: boolean,
	onClose: () => void,
	// make modal fit size of content or full page
	fitSize?: boolean,
	children?: React.ReactNode
} & Partial<Omit<ModalProps, 'onClose'>> ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <Dialog
			onClose={onClose}
			maxWidth='md'
			TransitionComponent={Transition}
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition
			sx={{
				'& .MuiDialog-paper': {
					marginLeft  : 'env(safe-area-inset-left)',
					marginRight : 'env(safe-area-inset-right)',
					marginBottom: 'env(safe-area-inset-bottom)'
				}
			}}
			{...props}>
			{children}
		</Dialog>;
	} else {
		return <SwipeableDrawer
			anchor='bottom'
			onClose={onClose}
			onOpen={() => null}
			disableSwipeToOpen
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition
			PaperProps={{
				sx: {
					maxHeight           : 'calc(100vh - env(safe-area-inset-top) - 32px)',
					height              : fitSize ? 'auto' : '100%',
					borderTopLeftRadius : 12,
					borderTopRightRadius: 12
				}
			}}
			{...props}>
			{children}
		</SwipeableDrawer>;
	}
}

export function PageModalContainer( { onClose, title, onSave, submit, children }: {
	onClose: () => void,
	title?: React.ReactNode,
	// renders and called by save button if set
	onSave?: () => void,
	// changes to submit instead
	submit?: boolean,
	children?: React.ReactNode
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <>
			{title && <DialogTitle>{title}</DialogTitle>}
			{children}
			<DialogActions>
				{onSave || submit ? <Button
					variant='contained'
					type={submit ? 'submit' : undefined}
					onClick={submit ? undefined : async () => {
						await onSave();
						onClose();
					}}>
					Save
				</Button> : undefined}
				<Button variant='contained' color='secondary' onClick={onClose}>
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
				{onSave || submit ? <Button
					variant='contained'
					type={submit ? 'submit' : undefined}
					onClick={submit ? undefined : async () => {
						await onSave();
						onClose();
					}}>Save</Button> : undefined}
			</Toolbar>
			{children}
		</>;
	}
}
