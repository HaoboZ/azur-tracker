import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from '../../components/link';
import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

function LinkItem( { children, href } ) {
	const newData = useSelector( state => state.main.newData );
	const dispatch = useDispatch();
	
	return <Link variant='h6' href={href}>
		<Badge
			color='secondary'
			variant='dot'
			sx={{ mr: 3 }}
			invisible={!newData[ href.substring( 1 ) ]}>
			<Button
				color='inherit'
				onClick={() => dispatch( setNewData( { [ href.substring( 1 ) ]: false } ) )}>
				{children}
			</Button>
		</Badge>
	</Link>;
}

export default function TitleBar( { children } ) {
	const theme = useSelector( state => state.main.theme );
	const dispatch = useDispatch();
	
	return <>
		<AppBar
			position='static'
			enableColorOnDark
			sx={{
				pt: 'env(safe-area-inset-top)',
				pl: 'env(safe-area-inset-left)',
				pr: 'env(safe-area-inset-right)'
			}}>
			<Toolbar>
				<Link
					href='/'
					variant='h6'
					sx={{ mr: 3 }}>
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
						}[ theme ] || 'light' ) );
					}}>
					{{
						'light'  : <BrightnessHighIcon/>,
						'dark'   : <Brightness3Icon/>,
						'default': <Brightness4Icon/>
					}[ theme ] || 'default'}
				</IconButton>
			</Toolbar>
		</AppBar>
		{children}
	</>;
}
