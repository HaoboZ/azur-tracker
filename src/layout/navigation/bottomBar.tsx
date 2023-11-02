'use client';
import { Tab, TabList, Tabs, Typography } from '@mui/joy';
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
		<Tabs
			value={index}
			component='nav'
			sx={{
				display: { xs: 'block', sm: 'none' },
				position: 'fixed',
				top: 'auto',
				bottom: 0,
				width: '100%',
			}}>
			<TabList disableUnderline sx={{ '--ListItem-gap': 0, 'height': 60 }}>
				{items.map((item, index) => (
					<Tab
						key={index}
						disableIndicator
						component={Link}
						href={item.href}
						orientation='vertical'
						sx={{ flex: 1, pt: 1, pb: 'calc(env(safe-area-inset-bottom) + 8px)' }}>
						{item.icon}
						<Typography>{item.label}</Typography>
					</Tab>
				))}
			</TabList>
		</Tabs>
	);
}
