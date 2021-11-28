import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../../../components/link';
import usePageHeight from '../../../lib/hooks/usePageHeight';
import { setNewData } from '../../../lib/store/reducers/mainReducer';

function LinkItem( { href, children }: { href: string, children: ReactNode } ) {
	const newData = useSelector( ( { main } ) => main.newData );
	const dispatch = useDispatch();
	
	return <Link href={ href }>
		<Badge
			color='secondary'
			variant='dot'
			sx={ { mr: 3 } }
			invisible={ !newData[ href.substring( 1 ) ] }>
			<Button
				color='inherit'
				onClick={ () => dispatch( setNewData( { [ href.substring( 1 ) ]: false } ) ) }>
				{ children }
			</Button>
		</Badge>
	</Link>;
}

export default function TitleBar( { children } ) {
	const height = usePageHeight();
	
	return <Box>
		<AppBar
			enableColorOnDark
			position='static'
			sx={ {
				pt: 'env(safe-area-inset-top)',
				pl: 'env(safe-area-inset-left)',
				pr: 'env(safe-area-inset-right)'
			} }>
			<Toolbar>
				<Typography variant='h3' sx={ { mr: 3 } }>
					Azur Lane Tracker
				</Typography>
				<LinkItem href='/'>Event</LinkItem>
				<LinkItem href='/research'>Research</LinkItem>
				<LinkItem href='/fleet'>Fleet</LinkItem>
				<LinkItem href='/info'>Info</LinkItem>
				<Box flexGrow={ 1 }/>
				<Link href='/settings'>
					<IconButton color='inherit'>
						<SettingsIcon/>
					</IconButton>
				</Link>
			</Toolbar>
		</AppBar>
		<Box
			pl='env(safe-area-inset-left)'
			pr='env(safe-area-inset-right)'
			minHeight={ `min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height}px)` }>
			{ children }
		</Box>
	</Box>;
}
