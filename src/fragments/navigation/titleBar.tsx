import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from '../../components/Link';
import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

const useStyles = makeStyles( ( theme ) => ( {
	appBar: {
		paddingTop  : 'env(safe-area-inset-top)',
		paddingLeft : 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)'
	},
	title : {
		marginRight: theme.spacing( 3 )
	}
} ) );

function LinkItem( { children, href } ) {
	const main = useSelector( state => state.main );
	const dispatch = useDispatch();
	const classes = useStyles();
	
	return <Link variant='h6' href={href}>
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
}

export default function TitleBar( { children } ) {
	const main = useSelector( state => state.main );
	const dispatch = useDispatch();
	const classes = useStyles();
	
	return <>
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<Link
					href='/'
					variant='h6'
					className={classes.title}>
					Azur Lane Tracker
				</Link>
				<LinkItem href='/event'>Event</LinkItem>
				<LinkItem href='/research'>Research</LinkItem>
				<LinkItem href='/ship'>Ship</LinkItem>
				<Box flexGrow={1}/>
				<IconButton
					color='inherit'
					onClick={() => {
						dispatch( setTheme( {
							'light'  : 'dark',
							'dark'   : 'default',
							'default': 'light'
						}[ main.theme ] || 'light' ) );
					}}>
					{{
						'light'  : <BrightnessHighIcon/>,
						'dark'   : <Brightness3Icon/>,
						'default': <Brightness4Icon/>
					}[ main.theme ] || 'default'}
				</IconButton>
			</Toolbar>
		</AppBar>
		{children}
	</>;
}
