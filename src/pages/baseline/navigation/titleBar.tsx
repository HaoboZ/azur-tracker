import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { PageLinkComponent } from '../../../components/page/link';
import usePageHeight from '../../../hooks/usePageHeight';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setNewData } from '../../../store/reducers/mainReducer';

function LinkItem( { href, store, children }: { href: string, store?: string, children: ReactNode } ) {
	const newData = useAppSelector( ( { main } ) => main.newData );
	const dispatch = useAppDispatch();
	
	return (
		<Badge
			color='secondary'
			variant='dot'
			sx={{ mr: 3 }}
			invisible={!newData[ store ]}>
			<Button
				component={PageLinkComponent}
				href={href}
				color='inherit'
				onClick={() => {
					if ( store ) dispatch( setNewData( { [ store ]: false } ) );
				}}>
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
					<LinkItem href='/' store='event'>Event</LinkItem>
					<LinkItem href='/research' store='research'>Research</LinkItem>
					<LinkItem href='/fleet' store='fleet'>Fleet</LinkItem>
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
				minHeight={`min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height}px)`}>
				{children}
			</Box>
		</Box>
	);
}
