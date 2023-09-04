'use client';
import { Box, Button, Typography } from '@mui/material';

export default function Error({ error, reset }: { error: Error; reset?: () => void }) {
	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			pt={10}>
			<Typography variant='h1'>
				{error.name}: {error.message}
			</Typography>
			<Button variant='contained' size='small' color='secondary' onClick={reset}>
				Retry
			</Button>
		</Box>
	);
}
