'use client';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { items } from './items';

export default function BottomBar() {
	const pathname = usePathname();

	return (
		<BottomNavigation
			showLabels
			value={pathname}
			sx={{
				display: { xs: 'flex', sm: 'none' },
				height: 'unset',
				width: '100%',
				position: 'fixed',
				bottom: 0,
			}}>
			{items.map((item, index) => (
				<BottomNavigationAction
					key={index}
					label={item.label}
					icon={item.icon}
					component={Link}
					href={item.href}
					sx={{ pt: 1, pb: 'calc(min(env(safe-area-inset-bottom), 16px) + 8px)' }}
				/>
			))}
		</BottomNavigation>
	);
}
