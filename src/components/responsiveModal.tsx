import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentProps,
	DialogProps,
	DialogTitle,
	Grow,
	IconButton,
	SwipeableDrawer,
	SwipeableDrawerProps,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery
} from '@mui/material';
import { ReactNode } from 'react';
import { useModalControls } from '../lib/providers/modal';

export type ModalVariant = 'adaptive' | 'bottom' | 'center';

export type ResponsiveModalProps = {
	open: boolean,
	onClose: () => void,
	// type of modal to be displayed
	variant?: ModalVariant,
	children?: ReactNode
} & Partial<Omit<SwipeableDrawerProps & DialogProps, 'open' | 'onClose' | 'variant' | 'children'>>;

export type ResponsiveModalContainerProps = {
	onClose?: () => void,
	// type of modal to be displayed
	variant?: ModalVariant,
	title?: ReactNode,
	// renders and called by save button if set
	onSave?: () => void,
	keepOpenOnSave?: boolean,
	children?: ReactNode
} & Omit<DialogContentProps, 'title'>;

export default function ResponsiveModal( {
	variant = 'adaptive',
	children,
	...props
}: ResponsiveModalProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	if ( variant === 'center' || variant === 'adaptive' && wide ) {
		return <Dialog
			maxWidth='md'
			fullWidth
			TransitionComponent={Grow}
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
					height              : variant === 'bottom' ? 'auto' : '100%',
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

export function ResponsiveModalContainer( {
	onClose,
	variant,
	title,
	onSave,
	keepOpenOnSave,
	children,
	...props
}: ResponsiveModalContainerProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	const { closeModal, modalInfo } = useModalControls();
	
	variant = variant ?? modalInfo?.modalProps?.variant ?? 'adaptive';
	onClose = onClose ?? closeModal;
	
	if ( variant === 'center' || variant === 'adaptive' && wide ) {
		return <>
			{title && <DialogTitle>{title}</DialogTitle>}
			<DialogContent {...props}>{children}</DialogContent>
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
				<Typography variant='h3' flexGrow={1}>
					{title}
				</Typography>
				{onSave ? <Button
					variant='contained'
					onClick={async () => {
						await onSave();
						!keepOpenOnSave && onClose();
					}}>Save</Button> : undefined}
			</Toolbar>
			<DialogContent onTouchStart={( e ) => e.stopPropagation()} {...props}>
				{children}
			</DialogContent>
		</>;
	}
}
