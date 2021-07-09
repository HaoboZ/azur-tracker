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

export default function PageModal( { onClose, title, onSave, fitSize, children, ...props }: {
	open: boolean,
	onClose: () => void,
	title?: React.ReactNode,
	// renders and called by save button if set
	onSave?: () => void,
	// make modal fit size of content or full page (default full page)
	fitSize?: boolean,
	children?: React.ReactNode
} & Partial<Omit<ModalProps, 'onClose'>> ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	if ( wide ) {
		return <Dialog
			onClose={onClose}
			maxWidth='md'
			fullWidth={!fitSize}
			TransitionComponent={Transition}
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition
			sx={{
				'& .MuiDialog-paper': {
					paddingLeft  : 'env(safe-area-inset-left)',
					paddingRight : 'env(safe-area-inset-right)',
					paddingBottom: 'env(safe-area-inset-bottom)'
				}
			}}
			{...props}>
			{title && <DialogTitle>{title}</DialogTitle>}
			{children}
			<DialogActions>
				{onSave ? <Button
					variant='contained'
					onClick={async () => {
						await onSave();
						onClose();
					}}>
					Save
				</Button> : undefined}
				<Button variant='contained' color='secondary' onClick={onClose}>
					{onSave ? 'Cancel' : 'Close'}
				</Button>
			</DialogActions>
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
					borderTopLeftRadius : 10,
					borderTopRightRadius: 10
				}
			}}
			{...props}>
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
						onClose();
					}}>Save</Button> : undefined}
			</Toolbar>
			{children}
		</SwipeableDrawer>;
	}
}
