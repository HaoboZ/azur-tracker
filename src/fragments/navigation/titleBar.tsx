import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from '../../components/link';
import usePageHeight from '../../lib/hooks/usePageHeight';
import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

function LinkItem( { children, href } ) {
	const newData = useSelector( ( { main } ) => main.newData );
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
	const theme = useSelector( ( { main } ) => main.theme );
	const dispatch = useDispatch();
	const height = usePageHeight();
	
	return <Box
		pl='env(safe-area-inset-left)'
		pr='env(safe-area-inset-right)'
		minHeight={`min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 64}px)`}>
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
	</Box>;
}
