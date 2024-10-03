import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import image from '@/public/images/startScreen.jpg';
import { auth } from '@/src/auth';
import { Box, Button, Grid2 } from '@mui/material';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
	{ name: 'Event', href: '/event' },
	{ name: 'Research', href: '/research' },
	{ name: 'Fleet', href: '/fleet' },
	{ name: 'Info', href: '/info' },
];

export default async function Main() {
	const session = await auth();

	return (
		<PageContainer>
			<PageTitle
				actions={
					session?.user.role === 'ADMIN' && (
						<form
							action={async () => {
								'use server';
								revalidateTag('sheets');
							}}>
							<Button type='submit' variant='outlined'>
								Revalidate
							</Button>
						</form>
					)
				}>
				Azur Lane Tracker
			</PageTitle>
			<Box sx={{ width: '100%', height: 300, position: 'relative', mb: 2 }}>
				<Image fill alt='Start Screen' src={image} style={{ objectFit: 'contain' }} />
			</Box>
			<Grid2 container spacing={1}>
				{menuItems.map((item) => (
					<Grid2 key={item.href} size={{ xs: 12, sm: 6 }}>
						<Button fullWidth variant='outlined' component={Link} href={item.href}>
							{item.name}
						</Button>
					</Grid2>
				))}
				{session?.user.role === 'ADMIN' && (
					<Grid2 key='tier' size={12}>
						<Button fullWidth variant='outlined' component={Link} href='/tier'>
							Tier
						</Button>
					</Grid2>
				)}
			</Grid2>
		</PageContainer>
	);
}
