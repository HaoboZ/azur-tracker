'use client';
import Page from '@/components/page';
import { PageLinkComponent } from '@/components/page/link';
import image from '@/public/images/startScreen.jpg';
import { Box, Button, Grid } from '@mui/material';
import Image from 'next/image';

const menuItems = [
	{ name: 'Event', href: 'event' },
	{ name: 'Research', href: 'research' },
	{ name: 'Fleet', href: 'fleet' },
	{ name: 'Info', href: 'info' }
];

export default function Main() {
	return (
		<Page hideBack title='Azur Lane Tracker'>
			<Box width='100%' height={300} position='relative' mb={2}>
				<Image
					fill
					alt='Start Screen'
					src={image}
					style={{ objectFit: 'contain' }}
				/>
			</Box>
			<Grid container spacing={1}>
				{menuItems.map( ( item ) => (
					<Grid key={item.href} item xs={12} sm={6}>
						<Button fullWidth variant='outlined' component={PageLinkComponent} href={item.href}>
							{item.name}
						</Button>
					</Grid>
				) )}
			</Grid>
		</Page>
	);
}
