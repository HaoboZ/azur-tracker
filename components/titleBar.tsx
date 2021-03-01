import {
	AppBar,
	Box,
	IconButton,
	Link as MuiLink,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar
} from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib/store';
import { setTheme } from '../lib/store/mainReducer';
import PortingDialog from './portingDialog';

const useStyles = makeStyles( ( theme ) => ( {
	title: {
		marginRight: theme.spacing( 3 )
	},
	links: {
		marginRight: theme.spacing( 2 )
	}
} ) );

export default function TitleBar() {
	const main     = useTypedSelector( store => store.main ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	const [ anchorEl, setAnchorEl ]         = React.useState<null | HTMLElement>( null ),
	      [ portingModal, setPortingModal ] = React.useState( false ),
	      [ portingType, setPortingType ]   = React.useState( 0 );
	
	return <AppBar position='static'>
		<Toolbar>
			<Link href='/' passHref>
				<MuiLink
					variant='h6' color='inherit' underline='none'
					className={ classes.title }>
					Azur Lane Tracker
				</MuiLink>
			</Link>
			<Link href='/event' passHref>
				<MuiLink
					variant='subtitle1' color='inherit' underline='none'
					className={ classes.links }>
					Event
				</MuiLink>
			</Link>
			<Link href='/research' passHref>
				<MuiLink
					variant='subtitle1' color='inherit' underline='none'
					className={ classes.links }>
					Research
				</MuiLink>
			</Link>
			<Link href='/ship' passHref>
				<MuiLink
					variant='subtitle1' color='inherit' underline='none'
					className={ classes.links }>
					Ship
				</MuiLink>
			</Link>
			<MuiLink
				variant='subtitle1' color='inherit' underline='none' href=''
				onClick={ ( e ) => {
					e.preventDefault();
					setAnchorEl( e.target );
				} }>
				More ▼
			</MuiLink>
			<Box flexGrow={ 1 }/>
			<IconButton
				color='inherit'
				onClick={ () => dispatch( setTheme( main.theme === 'dark' ? 'light' : 'dark' ) ) }>
				{ main.theme === 'light' ? <BrightnessHighIcon/> : <Brightness3Icon/> }
			</IconButton>
			<Menu
				anchorEl={ anchorEl }
				keepMounted
				open={ !!anchorEl }
				onClose={ () => setAnchorEl( null ) }>
				<MenuItem onClick={ () => {
					setAnchorEl( null );
					setPortingType( 0 );
					setPortingModal( true );
				} }>Export</MenuItem>
				<MenuItem onClick={ () => {
					setAnchorEl( null );
					setPortingType( 1 );
					setPortingModal( true );
				} }>Import</MenuItem>
			</Menu>
			<PortingDialog
				status={ portingModal } type={ portingType }
				closeModal={ () => setPortingModal( false ) }/>
		</Toolbar>
	</AppBar>;
}
