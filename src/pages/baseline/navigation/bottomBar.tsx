import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Info as InfoIcon,
	Settings as SettingsIcon
} from '@mui/icons-material';
import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import usePageHeight from '../../../hooks/usePageHeight';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setNewData } from '../../../store/reducers/mainReducer';

const items = [
	{ label: 'Event', icon: <EventIcon/>, href: '/', store: 'event' },
	{ label: 'Research', icon: <CameraIcon/>, href: '/research', store: 'research' },
	{ label: 'Fleet', icon: <DirectionsBoatIcon/>, href: '/fleet', store: 'fleet' },
	{ label: 'Info', icon: <InfoIcon/>, href: '/info' },
	{ label: 'Settings', icon: <SettingsIcon/>, href: '/settings' }
];

export default function BottomBar( { children } ) {
	const main = useAppSelector( ( { main } ) => main );
	const dispatch = useAppDispatch();
	const router = useRouter();
	const height = usePageHeight();
	
	const index = useMemo( () => {
		for ( let i = 0; i < items.length; ++i )
			if ( items[ i ].href === router.asPath ) return i;
	}, [ router.asPath ] );
	
	return (
		<Box>
			<Box
				position='fixed'
				top={0}
				zIndex='appBar'
				width='100%'
				height='env(safe-area-inset-top)'
				bgcolor='primary.main'
			/>
			<Box width='100%' height='env(safe-area-inset-top)'/>
			<Box
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'
				minHeight={`min(calc(100vh - 56px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height}px)`}>
				{children}
			</Box>
			<Box height='calc(env(safe-area-inset-bottom) + 56px)'/>
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
						router.push( item.href ).then();
						if ( 'store' in item )
							dispatch( setNewData( { [ item.store ]: false } ) );
					}}>
					{items.map( ( item, index ) => (
						<BottomNavigationAction
							key={index}
							sx={{ minWidth: 0 }}
							label={item.label}
							icon={(
								<Badge
									color='secondary'
									variant='dot'
									invisible={!main.newData[ item.store ]}>
									{item.icon}
								</Badge>
							)}
						/>
					) )}
				</BottomNavigation>
			</AppBar>
		</Box>
	);
}
