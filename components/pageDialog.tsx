import { Button, Dialog, DialogActions, makeStyles, Slide, Theme, useMediaQuery } from '@material-ui/core';
import { SlideProps } from '@material-ui/core/Slide/Slide';
import React from 'react';

const Transition = React.forwardRef( ( props: SlideProps, ref ) =>
	<Slide direction='up' ref={ref} {...props}/> );

const useStyles = makeStyles( {
	modal   : { marginTop: 'calc(env(safe-area-inset-top) + 56px)' },
	safeArea: {
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} );

export default function PageDialog( { open, onClose, onSave, children }: {
	open: boolean
	onClose: () => void
	onSave?: () => void
	children: React.ReactNode
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	const classes = useStyles();
	
	return <Dialog
		open={open}
		onClose={onClose}
		maxWidth='md'
		fullWidth
		fullScreen={!wide}
		classes={{ root: classes.modal, paper: classes.safeArea }}
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
