import { Settings as SettingsIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import { items } from './items';

export default function TitleBar() {
	return (
		<Box
			component='nav'
			display={{ xs: 'none', sm: 'block' }}
			bgcolor='primary.solidBg'
			pt='env(safe-area-inset-top)'
			pl='env(safe-area-inset-left)'
			pr='env(safe-area-inset-right)'>
			<Stack direction='row' p={1} alignItems='center'>
				<Typography component={Link} href='/' level='h4' mr={3} sx={{ textDecoration: 'none' }}>
					Azur Lane Tracker
				</Typography>
				{items
					.filter(({ hide }) => !hide)
					.map((item) => (
						<Button key={item.label} component={Link} href={item.href}>
							{item.label}
						</Button>
					))}
				<Box flexGrow={1} />
				<IconButton component={Link} href='/settings' variant='solid' color='primary'>
					<SettingsIcon />
				</IconButton>
			</Stack>
		</Box>
	);
}
