'use client';
import { AppBar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { items } from './items';

export default function BottomBar() {
	const pathname = usePathname();

	const index = useMemo(() => {
		for (let i = 0; i < items.length; ++i) if (items[i].href === pathname) return i;
	}, [pathname]);

	return (
		<AppBar
			position='fixed'
			color='inherit'
			sx={{ display: { xs: 'block', sm: 'none' }, top: 'auto', bottom: 0 }}>
			<BottomNavigation
				showLabels
				value={index}
				sx={{
					height: 'calc(env(safe-area-inset-bottom) + 56px)',
					pl: 'env(safe-area-inset-left)',
					pr: 'env(safe-area-inset-right)',
					pb: 'env(safe-area-inset-bottom)',
				}}>
				{items.map((item, index) => (
					<BottomNavigationAction
						key={index}
						sx={{ minWidth: 0 }}
						label={item.label}
						icon={item.icon}
						component={Link}
						href={item.href}
					/>
				))}
			</BottomNavigation>
		</AppBar>
	);
}
