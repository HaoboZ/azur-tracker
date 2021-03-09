import {
	AppBar,
	Box,
	IconButton,
	Link as MuiLink,
	makeStyles,
	Menu,
	MenuItem,
	Theme,
	Toolbar,
	useMediaQuery
} from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	BrightnessHigh as BrightnessHighIcon,
	MoreHoriz as MoreHorizIcon
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib/store';
import { setTheme } from '../lib/store/mainReducer';
import PortingDialog from './portingDialog';

const useStyles = makeStyles( ( theme ) => ( {
	title: {
		paddingRight: theme.spacing( 3 )
	}
} ) );

const LinkItem = React.forwardRef( ( { children, href }: any, ref ) => {
	return <Link href={ href }><MenuItem>{ children }</MenuItem></Link>;
} );

export default function TitleBar() {
	const main     = useTypedSelector( store => store.main ),
	      dispatch = useDispatch();
	
	const classes = useStyles(),
	      size    = useMediaQuery( ( theme: Theme ) => theme.breakpoints.up( 'sm' ) );
	
	const [ anchorEl, setAnchorEl ]         = React.useState<HTMLElement>( null ),
	      [ portingModal, setPortingModal ] = React.useState( false ),
	      [ portingType, setPortingType ]   = React.useState( false );
	
	const links = [
		<LinkItem key='event' href='/event'>Event</LinkItem>,
		<LinkItem key='research' href='/research'>Research</LinkItem>,
		<LinkItem key='armada' href='/armada'>Armada</LinkItem>,
		<MuiLink
			key='export'
			color='inherit' underline='none'
			onClick={ ( e ) => {
				e.preventDefault();
				setPortingType( false );
				setPortingModal( true );
			} }>
			<MenuItem>Export</MenuItem>
		</MuiLink>,
		<MuiLink
			key='import'
			color='inherit' underline='none'
			onClick={ ( e ) => {
				e.preventDefault();
				setPortingType( true );
				setPortingModal( true );
			} }>
			<MenuItem>Import</MenuItem>
		</MuiLink>
	];
	
	return <AppBar position='static'>
		<Toolbar>
			<Link key='index' href='/' passHref>
				<MuiLink
					variant='h6' color='inherit' underline='none'
					className={ classes.title }>
					Azur Lane Tracker
				</MuiLink>
			</Link>
			{ size ? links : <IconButton
				color='inherit'
				onClick={ ( e ) => setAnchorEl( e.currentTarget ) }>
				<MoreHorizIcon/>
			</IconButton> }
			<Menu
				anchorEl={ anchorEl }
				keepMounted
				open={ !!anchorEl }
				onClose={ () => setAnchorEl( null ) }>
				{ links.map( item => item ) }
			</Menu>
			<Box flexGrow={ 1 }/>
			<IconButton
				color='inherit'
				onClick={ () => dispatch( setTheme( main.theme === 'dark' ? 'light' : 'dark' ) ) }>
				{ main.theme === 'light' ? <BrightnessHighIcon/> : <Brightness3Icon/> }
			</IconButton>
			<PortingDialog
				status={ portingModal }
				type={ portingType }
				closeModal={ () => setPortingModal( false ) }
			/>
		</Toolbar>
	</AppBar>;
}
