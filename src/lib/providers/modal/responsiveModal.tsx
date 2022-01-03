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
import AsyncLoadingButton from '../../../components/asyncLoadingButton';
import { useModalControls } from './index';

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

export default function ResponsiveModal( { variant = 'adaptive', ...props }: ResponsiveModalProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	if ( variant === 'center' || variant === 'adaptive' && wide ) {
		return (
			<Dialog
				fullWidth
				disablePortal
				closeAfterTransition
				maxWidth='md'
				TransitionComponent={Grow}
				sx={{
					'.MuiDialog-paper': {
						ml: 'env(safe-area-inset-left)',
						mr: 'env(safe-area-inset-right)',
						mt: 'env(safe-area-inset-top)',
						mb: 'env(safe-area-inset-bottom)'
					}
				}}
				{...props}
			/>
		);
	} else {
		return (
			<SwipeableDrawer
				disableSwipeToOpen
				disablePortal
				closeAfterTransition
				anchor='bottom'
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
				onOpen={() => null}
				{...props}
			/>
		);
	}
}

export function ResponsiveModalContainer( {
	onClose,
	variant,
	title,
	onSave,
	keepOpenOnSave,
	...props
}: ResponsiveModalContainerProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	const { closeModal, modalInfo } = useModalControls();
	
	variant = variant ?? modalInfo?.modalProps?.variant ?? 'adaptive';
	onClose = onClose ?? closeModal;
	
	if ( variant === 'center' || variant === 'adaptive' && wide ) {
		return (
			<>
				{title && <DialogTitle>{title}</DialogTitle>}
				<DialogContent {...props}/>
				<DialogActions>
					{onSave ? (
						<AsyncLoadingButton
							variant='contained'
							onClick={async () => {
								await onSave();
								!keepOpenOnSave && onClose();
							}}>
							Save
						</AsyncLoadingButton>
					) : undefined}
					<Button variant='contained' color='error' onClick={onClose}>
						{onSave ? 'Cancel' : 'Close'}
					</Button>
				</DialogActions>
			</>
		);
	} else {
		return (
			<>
				<Toolbar>
					<IconButton edge='start' color='inherit' onClick={onClose}>
						<ArrowBackIcon/>
					</IconButton>
					<Typography variant='h3' flexGrow={1}>
						{title}
					</Typography>
					{onSave ? (
						<AsyncLoadingButton
							variant='contained'
							onClick={async () => {
								await onSave();
								!keepOpenOnSave && onClose();
							}}>Save
						</AsyncLoadingButton>
					) : undefined}
				</Toolbar>
				<DialogContent onTouchStart={( e ) => e.stopPropagation()} {...props}/>
			</>
		);
	}
}