import {
	AppBar,
	Box,
	IconButton,
	Link as MuiLink,
	makeStyles,
	MenuItem,
	Toolbar
} from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../lib/store/reducers/mainReducer';

const useStyles = makeStyles( ( theme ) => ( {
	title: {
		paddingRight: theme.spacing( 3 )
	}
} ) );

const LinkItem = ( { children, href } ) => {
	return <Link href={href}><MenuItem>{children}</MenuItem></Link>;
};

export default function TitleBar() {
	const main     = useSelector( store => store.main ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	return <AppBar position='static'>
		<Toolbar>
			<Link key='index' href='/' passHref>
				<MuiLink
					variant='h6' color='inherit' underline='none'
					className={classes.title}>
					Azur Lane Tracker
				</MuiLink>
			</Link>
			<LinkItem href='/event'>Event</LinkItem>
			<LinkItem href='/research'>Research</LinkItem>
			<LinkItem href='/armada'>Armada</LinkItem>
			<Box flexGrow={1}/>
			<IconButton
				color='inherit'
				onClick={() => dispatch( setTheme( main.theme === 'dark' ? 'light' : 'dark' ) )}>
				{main.theme === 'light' ? <BrightnessHighIcon/> : <Brightness3Icon/>}
			</IconButton>
		</Toolbar>
	</AppBar>;
}
