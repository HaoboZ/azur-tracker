import { Link as MuiLink, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

export default function Home() {
	return <>
		<Typography>
			All data is saved client side so export to transfer data
		</Typography>
		{/*<Typography>*/}
		{/*	<Link href='/ships' passHref>*/}
		{/*		<MuiLink variant='subtitle1' color='textSecondary' underline='always'>*/}
		{/*			Ship Tracker*/}
		{/*		</MuiLink>*/}
		{/*	</Link>*/}
		{/*	{ ' ' }- tracks ship levels and their equips (for those who want to collect/level every*/}
		{/*	ship by tier or all ships to have good equips)*/}
		{/*</Typography>*/}
		<Typography>
			<Link href='/event' passHref>
				<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
					Event Tracker
				</MuiLink>
			</Link>
			{ ' ' }- calculates farming runs for any stage until you reach your target points
		</Typography>
		<Typography>
			<Link href='/research' passHref>
				<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
					Research Tracker
				</MuiLink>
			</Link>
			{ ' ' }- calculates number of strengthing units for pr ships until max
		</Typography>
	</>;
}
