import { PageLinkComponent } from '@/components/page/link';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { useAuth } from '../../providers/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setViewed } from '../../store/reducers/mainReducer';
import { items } from './items';

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

export default function TitleBar() {
	const user = useAuth();
	
	return (
		<AppBar
			enableColorOnDark
			position='static'
			sx={{
				pt: 'env(safe-area-inset-top)',
				pl: 'env(safe-area-inset-left)',
				pr: 'env(safe-area-inset-right)'
			}}>
			<Toolbar>
				<Typography variant='h3' mr={3}>Azur Lane Tracker</Typography>
				{items.filter( Boolean ).filter( ( { hide } ) => !hide ).map( ( item ) => (
					<LinkItem key={item.label} href={item.href} store={item.store}>
						{item.label}
					</LinkItem>
				) )}
				{user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && <LinkItem href='/tier'>Tier</LinkItem>}
				<Box flexGrow={1}/>
				<IconButton component={PageLinkComponent} href='/settings' color='inherit'>
					<SettingsIcon/>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
