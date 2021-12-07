import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageLinkComponent } from '../../../components/page/link';
import usePageHeight from '../../../lib/hooks/usePageHeight';
import { setNewData } from '../../../lib/store/reducers/mainReducer';

function LinkItem( { href, children }: { href: string, children: ReactNode } ) {
	const newData = useSelector( ( { main } ) => main.newData );
	const dispatch = useDispatch();
	
	return (
		<Badge
			color='secondary'
			variant='dot'
			sx={{ mr: 3 }}
			invisible={!newData[ href.substring( 1 ) ]}>
			<Button
				component={PageLinkComponent}
				href={href}
				color='inherit'
				onClick={() => dispatch( setNewData( { [ href.substring( 1 ) ]: false } ) )}>
				{children}
			</Button>
		</Badge>
	);
}

export default function TitleBar( { children } ) {
	const height = usePageHeight();
	
	return (
		<Box>
			<AppBar
				enableColorOnDark
				position='static'
				sx={{
					pt: 'env(safe-area-inset-top)',
					pl: 'env(safe-area-inset-left)',
					pr: 'env(safe-area-inset-right)'
				}}>
				<Toolbar>
					<Typography variant='h3' sx={{ mr: 3 }}>
						Azur Lane Tracker
					</Typography>
					<LinkItem href='/'>Event</LinkItem>
					<LinkItem href='/research'>Research</LinkItem>
					<LinkItem href='/fleet'>Fleet</LinkItem>
					<LinkItem href='/info'>Info</LinkItem>
					<Box flexGrow={1}/>
					<IconButton component={PageLinkComponent} href='/settings' color='inherit'>
						<SettingsIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'
				minHeight={`min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${ height }px)`}>
				{children}
			</Box>
		</Box>
	);
}
