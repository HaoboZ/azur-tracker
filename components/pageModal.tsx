import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	makeStyles,
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

const useStyles = makeStyles( ( theme ) => ( {
	modal     : {
		height              : `calc(100vh - env(safe-area-inset-top) - ${theme.spacing( 6 )}px)`,
		borderTopLeftRadius : theme.spacing( 2 ),
		borderTopRightRadius: theme.spacing( 2 )
	},
	modalTitle: {
		flexGrow: 1
	},
	safeArea  : {
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} ) );

export default function PageModal( { open, onClose, title, onSave, children }: {
	open: boolean,
	onClose: () => void,
	title?: React.ReactNode,
	onSave?: () => void,
	children?: React.ReactNode
} ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	if ( wide ) {
		return <Dialog
			open={open}
			onClose={onClose}
			maxWidth='md'
			fullWidth
			classes={{ paper: classes.safeArea }}
			TransitionComponent={Transition}
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition>
			{title && <DialogTitle>{title}</DialogTitle>}
			{children}
			<DialogActions>
				{onSave ? <Button
					variant='contained'
					color='primary'
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
			open={open}
			onClose={onClose}
			PaperProps={{ className: classes.modal }}
			onOpen={() => null}
			disableSwipeToOpen
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition>
			<Toolbar>
				<IconButton edge='start' color='inherit' onClick={onClose}>
					<ArrowBackIcon/>
				</IconButton>
				{title && <Typography variant='h6' className={classes.modalTitle}>
					{title}
				</Typography>}
				<Button
					color='primary'
					variant='contained'
					onClick={async () => {
						await onSave();
						onClose();
					}}>Save</Button>
			</Toolbar>
			{children}
		</SwipeableDrawer>;
	}
}
