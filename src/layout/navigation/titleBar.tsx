import { PageLinkComponent } from '@/components/page/link';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import pget from '../../helpers/pget';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../store/reducers/mainReducer';
import { items } from './items';

function LinkItem({
	href,
	store,
	children,
}: {
	href: string;
	store?: string;
	children: ReactNode;
}) {
	const unViewed = useAppSelector(pget('main.unViewed'));
	const dispatch = useAppDispatch();

	return (
		<Badge color='secondary' variant='dot' sx={{ mr: 3 }} invisible={!unViewed[store]}>
			<Button
				component={PageLinkComponent}
				href={href}
				color='inherit'
				onClick={() => {
					if (store) dispatch(mainActions.setViewed(store));
				}}>
				{children}
			</Button>
		</Badge>
	);
}

export default function TitleBar() {
	return (
		<AppBar
			enableColorOnDark
			position='static'
			sx={{
				display: { xs: 'none', sm: 'block' },
				pt: 'env(safe-area-inset-top)',
				pl: 'env(safe-area-inset-left)',
				pr: 'env(safe-area-inset-right)',
			}}>
			<Toolbar>
				<Typography
					component={PageLinkComponent}
					href='/'
					color='inherit'
					variant='h3'
					mr={3}
					sx={{ textDecoration: 'none' }}>
					Azur Lane Tracker
				</Typography>
				{items
					.filter(({ hide }) => !hide)
					.map((item) => (
						<LinkItem key={item.label} href={item.href} store={item.store}>
							{item.label}
						</LinkItem>
					))}
				<Box flexGrow={1} />
				<IconButton component={PageLinkComponent} href='/settings' color='inherit'>
					<SettingsIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
