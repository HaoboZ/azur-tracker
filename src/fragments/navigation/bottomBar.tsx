import { AppBar, Badge, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Home as HomeIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

const useStyles = makeStyles( ( theme ) => ( {
	statusBar           : {
		position       : 'fixed',
		top            : 0,
		zIndex         : 1100,
		width          : '100%',
		height         : 'env(safe-area-inset-top)',
		backgroundColor: theme.palette.primary.main
	},
	statusBarPlaceholder: {
		width : '100%',
		height: 'env(safe-area-inset-top)'
	},
	footerPlaceholder   : {
		height: 'calc(56px + env(safe-area-inset-bottom))'
	},
	appBar              : {
		top          : 'auto',
		bottom       : 0,
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} ) );

const items = [
	{ label: 'Home', icon: <HomeIcon/>, link: '/' },
	{ label: 'Event', icon: <EventIcon/>, link: '/event' },
	{ label: 'Research', icon: <CameraIcon/>, link: '/research' },
	{ label: 'Ship', icon: <DirectionsBoatIcon/>, link: '/ship' }
];

export default function BottomBar( { children } ) {
	const main = useSelector( state => state.main );
	const dispatch = useDispatch();
	const router = useRouter();
	const classes = useStyles();
	
	const index = React.useMemo( () => {
		for ( let i = 0; i < items.length; ++i )
			if ( items[ i ].link === router.asPath )
				return i;
	}, [ router.asPath ] );
	
	return <>
		<div className={classes.statusBar}/>
		<div className={classes.statusBarPlaceholder}/>
		{children}
		<div className={classes.footerPlaceholder}/>
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
						dispatch( setNewData( { [ items[ value ].link.substring( 1 ) ]: false } ) );
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
	</>;
}
