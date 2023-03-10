'use client';
import Page from '@/components/page';
import image from '@/public/images/startScreen.jpg';
import { Box, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const menuItems = [
	{ name: 'Event', href: 'event' },
	{ name: 'Research', href: 'research' },
	{ name: 'Fleet', href: 'fleet' },
	{ name: 'Info', href: 'info' }
];

export default function Main() {
	const router = useRouter();
	
	return (
		<Page title='Azur Lane Tracker'>
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
						<Card>
							<CardActionArea onClick={() => router.push( item.href )}>
								<CardContent sx={{ textAlign: 'center' }}>
									{item.name}
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				) )}
			</Grid>
		</Page>
	);
}
