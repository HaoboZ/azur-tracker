import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useWindowSize } from 'rooks';
import { PageLinkComponent } from '../../../components/page/link';
import { useAuth } from '../../../providers/auth';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setViewed } from '../../../store/reducers/mainReducer';

function LinkItem( { href, store, children }: { href: string, store?: string, children: ReactNode } ) {
	const unViewed = useAppSelector( ( { main } ) => main.unViewed );
	const dispatch = useAppDispatch();
	
	return (
		<Badge
			color='secondary'
			variant='dot'
			sx={{ mr: 3 }}
			invisible={!unViewed[ store ]}>
			<Button
				component={PageLinkComponent}
				href={href}
				color='inherit'
				onClick={() => {
					if ( store ) dispatch( setViewed( store ) );
				}}>
				{children}
			</Button>
		</Badge>
	);
}

export default function TitleBar( { children } ) {
	const { innerHeight } = useWindowSize();
	const user = useAuth();
	
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
					{user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && <LinkItem href='/tier'>Tier</LinkItem>}
					<Box flexGrow={1}/>
					<IconButton component={PageLinkComponent} href='/settings' color='inherit'>
						<SettingsIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'
				minHeight={`min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${innerHeight}px)`}>
				{children}
			</Box>
		</Box>
	);
}
