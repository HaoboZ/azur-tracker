import { Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { items } from './items';

export default function TitleBar() {
	return (
		<AppBar
			enableColorOnDark
			position='sticky'
			sx={{
				display: { xs: 'none', sm: 'block' },
				pt: 'env(safe-area-inset-top)',
				pl: 'env(safe-area-inset-left)',
				pr: 'env(safe-area-inset-right)',
			}}>
			<Toolbar variant='dense'>
				<Typography
					component={Link}
					href='/'
					variant='h4'
					color='inherit'
					sx={{ mr: 3, textDecoration: 'none' }}>
					Azur Lane Tracker
				</Typography>
				{items
					.filter(({ hide }) => !hide)
					.map((item) => (
						<Button key={item.label} component={Link} href={item.href} color='inherit'>
							{item.label}
						</Button>
					))}
				<Box sx={{ flexGrow: 1 }} />
				<IconButton component={Link} href='/settings' color='inherit'>
					<SettingsIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
