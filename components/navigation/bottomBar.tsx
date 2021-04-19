import { AppBar, Badge, BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Home as HomeIcon
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

const useStyles = makeStyles( () => ( {
	footer: {
		height: 56
	},
	appBar: {
		top:           'auto',
		bottom:        0,
		paddingLeft:   'env(safe-area-inset-left)',
		paddingRight:  'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} ) );

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
	const classes = useStyles();
	
	const index = React.useMemo( () => {
		for ( let i = 0; i < items.length; ++i ) {
			if ( items[ i ].link === router.asPath )
				return i;
		}
	}, [ router.asPath ] );
	
	return <div className={classes.footer}>
		<AppBar position='fixed' color='inherit' className={classes.appBar}>
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
						dispatch( setNewData( { [ items[ value ].link.substring(1) ]: false } ) );
						break;
					}
				}}>
				{items.map( ( item, index ) => <BottomNavigationAction
					key={index}
					label={item.label}
					icon={<Badge
						color='secondary'
						variant='dot'
						invisible={!main.newData[ item.link.substring( 1 ) ]}>
						{item.icon}
					</Badge>}
				/> )}
			</BottomNavigation>
		</AppBar>
	</div>;
}
