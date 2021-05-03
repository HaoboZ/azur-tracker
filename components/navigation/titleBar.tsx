import { AppBar, Badge, Box, Button, IconButton, Link as MuiLink, makeStyles, Toolbar } from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

const useStyles = makeStyles( ( theme ) => ( {
	appBar: {
		paddingTop:   'env(safe-area-inset-top)',
		paddingLeft:  'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)'
	},
	title:  {
		marginRight: theme.spacing( 3 )
	}
} ) );

export default function TitleBar() {
	const main     = useSelector( store => store.main ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	const LinkItem = ( { children, href } ) => <Link href={href}>
		<Badge
			color='secondary'
			variant='dot'
			className={classes.title}
			invisible={!main.newData[ href.substring( 1 ) ]}>
			<Button color='inherit' onClick={() => dispatch( setNewData( { [ href.substring( 1 ) ]: false } ) )}>
				{children}
			</Button>
		</Badge>
	</Link>;
	
	return <AppBar position='static' className={classes.appBar}>
		<Toolbar>
			<Link key='index' href='/' passHref>
				<MuiLink
					variant='h6'
					color='inherit'
					underline='none'
					className={classes.title}>
					Azur Lane Tracker
				</MuiLink>
			</Link>
			<LinkItem href='/event'>Event</LinkItem>
			<LinkItem href='/research'>Research</LinkItem>
			<LinkItem href='/ship'>Ship</LinkItem>
			<Box flexGrow={1}/>
			<IconButton
				color='inherit'
				onClick={() => {
					dispatch( setTheme( {
						'light':   'dark',
						'dark':    'default',
						'default': 'light'
					}[ main.theme ] || 'light' ) );
				}}>
				{{
					'light':   <BrightnessHighIcon/>,
					'dark':    <Brightness3Icon/>,
					'default': <Brightness4Icon/>
				}[ main.theme ] || 'default'}
			</IconButton>
		</Toolbar>
	</AppBar>;
}
