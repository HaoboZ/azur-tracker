import { AppBar, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	BrightnessHigh as BrightnessHighIcon,
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Home as HomeIcon
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../lib/store/reducers/mainReducer';

const items = [
	{ label: 'Home', icon: <HomeIcon/>, link: '/' },
	{ label: 'Event', icon: <EventIcon/>, link: '/event' },
	{ label: 'Research', icon: <CameraIcon/>, link: '/research' },
	{ label: 'Armada', icon: <DirectionsBoatIcon/>, link: '/armada' }
];

export default function BottomBar() {
	const main     = useSelector( store => store.main ),
	      dispatch = useDispatch();
	const router = useRouter();
	
	const index = React.useMemo( () => {
		for ( let i = 0; i < items.length; ++i ) {
			if ( items[ i ].link === router.asPath )
				return i;
		}
	}, [ router.asPath ] );
	
	return <AppBar position='fixed' style={{ top: 'auto', bottom: 0 }}>
		<BottomNavigation
			showLabels
			value={index}
			onChange={( e, value ) => {
				switch ( value ) {
				case 4:
					dispatch( setTheme( main.theme === 'dark' ? 'light' : 'dark' ) );
					break;
				default:
					router.push( items[ value ].link ).then();
					break;
				}
			}}>
			{items.map( ( item, index ) =>
				<BottomNavigationAction key={index} label={item.label} icon={item.icon}/> )}
			<BottomNavigationAction
				label='Theme'
				icon={main.theme === 'light' ? <BrightnessHighIcon/> : <Brightness3Icon/>}
			/>
		</BottomNavigation>
	</AppBar>;
}
