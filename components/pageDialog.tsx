import { Button, Dialog, DialogActions, Slide, Theme, useMediaQuery } from '@material-ui/core';
import { SlideProps } from '@material-ui/core/Slide/Slide';
import React from 'react';

const Transition = React.forwardRef( ( props: SlideProps, ref ) =>
	<Slide direction='up' ref={ref} {...props}/> );

export default function PageDialog( { open, onClose, onSave, children }: {
	open: boolean
	onClose: () => void
	onSave?: () => void
	children: React.ReactNode
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <Dialog
		open={open}
		onClose={onClose}
		maxWidth='md'
		fullWidth
		fullScreen={!wide}
		TransitionComponent={Transition}
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		{children}
		<DialogActions>
			<Button variant='contained' color='primary' onClick={() => {
				onSave?.();
				onClose();
			}}>
				Save
			</Button>
			<Button variant='contained' color='secondary' onClick={onClose}>
				{onSave ? 'Cancel' : 'Close'}
			</Button>
		</DialogActions>
	</Dialog>;
}
