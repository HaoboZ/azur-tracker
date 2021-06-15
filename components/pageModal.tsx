import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	makeStyles,
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

const useStyles = makeStyles<Theme, { fitSize: boolean }>( ( theme ) => ( {
	modal    : {
		maxHeight           : `calc(100vh - env(safe-area-inset-top) - ${theme.spacing( 6 )}px)`,
		height              : ( { fitSize } ) => fitSize ? 'auto' : '100%',
		borderTopLeftRadius : theme.spacing( 2 ),
		borderTopRightRadius: theme.spacing( 2 )
	},
	fullTitle: {
		flexGrow: 1
	},
	safeArea : {
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} ) );

export default function PageModal( { onClose, title, onSave, fitSize, children, ...props }: {
	open: boolean,
	onClose: () => void,
	title?: React.ReactNode,
	onSave?: () => void,
	fitSize?: boolean,
	children?: React.ReactNode
} & Partial<Omit<ModalProps, 'onClose'>> ) {
	const classes = useStyles( { fitSize } );
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
			classes={{ paper: classes.safeArea }}
			{...props}>
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
			onClose={onClose}
			onOpen={() => null}
			disableSwipeToOpen
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			closeAfterTransition
			PaperProps={{ className: classes.modal }}
			{...props}>
			<Toolbar>
				<IconButton edge='start' color='inherit' onClick={onClose}>
					<ArrowBackIcon/>
				</IconButton>
				<Typography variant='h6' className={classes.fullTitle}>
					{title}
				</Typography>
				{onSave ? <Button
					color='primary'
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
