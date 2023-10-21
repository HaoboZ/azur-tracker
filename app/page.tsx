'use client';
import PageContainer from '@/components/page/container';
import { PageLinkComponent } from '@/components/page/link';
import PageTitle from '@/components/page/title';
import image from '@/public/images/startScreen.jpg';
import { useAuth } from '@/src/providers/auth';
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

const menuItems = [
	{ name: 'Event', href: 'event' },
	{ name: 'Research', href: 'research' },
	{ name: 'Fleet', href: 'fleet' },
	{ name: 'Info', href: 'info' },
];

export default function Main() {
	const user = useAuth();

	return (
		<PageContainer noSsr>
			<PageTitle
				actions={
					user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && [
						{
							name: 'Revalidate',
							onClick: () =>
								axios.post(`api/revalidate?secret=${process.env.NEXT_PUBLIC_ADMIN_ID}`),
						},
					]
				}>
				Azur Lane Tracker
			</PageTitle>
			<Box width='100%' height={300} position='relative' mb={2}>
				<Image fill alt='Start Screen' src={image} style={{ objectFit: 'contain' }} />
			</Box>
			<Grid container spacing={1}>
				{menuItems.map((item) => (
					<Grid key={item.href} item xs={12} sm={6}>
						<Button
							fullWidth
							variant='outlined'
							component={PageLinkComponent}
							href={item.href}>
							{item.name}
						</Button>
					</Grid>
				))}
				{user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && (
					<Grid key='tier' item xs={12}>
						<Button fullWidth variant='outlined' component={PageLinkComponent} href='tier'>
							Tier
						</Button>
					</Grid>
				)}
			</Grid>
		</PageContainer>
	);
}
