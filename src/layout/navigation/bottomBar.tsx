import { AppBar, Badge, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setViewed } from '../../store/reducers/mainReducer';
import { items } from './items';

export default function BottomBar() {
	const unViewed = useAppSelector( ( { main } ) => main.unViewed );
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	
	const index = useMemo( () => {
		for ( let i = 0; i < items.length; ++i )
			if ( items[ i ].href === pathname ) return i;
	}, [ pathname ] );
	
	return (
		<AppBar
			position='fixed'
			color='inherit'
			sx={{ top: 'auto', bottom: 0 }}>
			<BottomNavigation
				showLabels
				value={index}
				sx={{
					height: 'calc(env(safe-area-inset-bottom) + 56px)',
					pl    : 'env(safe-area-inset-left)',
					pr    : 'env(safe-area-inset-right)',
					pb    : 'env(safe-area-inset-bottom)'
				}}
				onChange={( e, value ) => {
					const item = items[ value ];
					router.push( item.href );
					if ( 'store' in item ) dispatch( setViewed( item.store ) );
				}}>
				{items.filter( Boolean ).map( ( item, index ) => (
					<BottomNavigationAction
						key={index}
						sx={{ minWidth: 0 }}
						label={item.label}
						icon={(
							<Badge
								color='secondary'
								variant='dot'
								invisible={!unViewed[ item.store ]}>
								{item.icon}
							</Badge>
						)}
					/>
				) )}
			</BottomNavigation>
		</AppBar>
	);
}