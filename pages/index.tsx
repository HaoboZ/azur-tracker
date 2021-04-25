import {
	Button,
	ButtonGroup,
	Link as MuiLink,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Slider,
	Typography
} from '@material-ui/core';
import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBackup, setBackup } from '../lib/backup';
import { useIndicator } from '../lib/provider/indicatorProvider';
import { useSnackBar } from '../lib/provider/snackbarProvider';
import {
	setAutoLoad,
	setAutoLoadInterval,
	setAutoSave,
	setAutoSaveInterval,
	setTheme
} from '../lib/store/reducers/mainReducer';

const useStyles = makeStyles( {
	longText:   {
		width:        '70%',
		whiteSpace:   'nowrap',
		overflow:     'hidden',
		textOverflow: 'ellipsis'
	},
	longAction: {
		width: '40%'
	}
} );

export default function Home() {
	const main     = useSelector( store => store.main ),
	      dispatch = useDispatch();
	const [ session, loading ] = useSession();
	const snackbar = useSnackBar();
	const indicator = useIndicator();
	const classes = useStyles();
	
	// noinspection HtmlUnknownTarget
	return <List>
		<ListItem>
			<ListItemText classes={{ primary: classes.longText }}>
				{loading ? 'Loading...' :
					( session ? `Account: ${session.user.email}` : 'Sign in for Cloud Save' )}
			</ListItemText>
			{!loading && <ListItemSecondaryAction>
				{session ? <Button
					variant='outlined'
					color='inherit'
					onClick={() => signOut()}>
					Sign Out
				</Button> : <Button
					variant='outlined'
					color='inherit'
					onClick={() => signIn( 'google' )}>
					Sign In
				</Button>}
			</ListItemSecondaryAction>}
		</ListItem>
		<ListItem>
			<ListItemText>Auto Backup</ListItemText>
			<ListItemSecondaryAction>
				<ToggleButtonGroup size='small'>
					<ToggleButton
						value='autoSave'
						selected={main.autoSave}
						onClick={() => dispatch( setAutoSave( !main.autoSave ) )}>
						Save
					</ToggleButton>
					<ToggleButton
						value='autoLoad'
						selected={main.autoLoad}
						onClick={() => dispatch( setAutoLoad( !main.autoLoad ) )}>
						Load
					</ToggleButton>
				</ToggleButtonGroup>
			</ListItemSecondaryAction>
		</ListItem>
		<ListItem>
			<ListItemText>Auto Save Interval (secs)</ListItemText>
			<ListItemSecondaryAction className={classes.longAction}>
				<Slider
					value={main.autoSaveInterval}
					onChange={( e, val: number ) => dispatch( setAutoSaveInterval( val ) )}
					valueLabelDisplay='auto'
					valueLabelFormat={( value ) => value / 1000}
					step={500}
					marks
					min={500}
					max={5000}
				/>
			</ListItemSecondaryAction>
		</ListItem>
		<ListItem>
			<ListItemText>Auto Load Interval (secs)</ListItemText>
			<ListItemSecondaryAction className={classes.longAction}>
				<Slider
					value={main.autoLoadInterval}
					onChange={( e, val: number ) => dispatch( setAutoLoadInterval( val ) )}
					valueLabelDisplay='auto'
					valueLabelFormat={( value ) => value / 1000}
					step={2500}
					marks
					min={5000}
					max={30000}
				/>
			</ListItemSecondaryAction>
		</ListItem>
		<ListItem>
			<ListItemText>Manual Backup</ListItemText>
			<ListItemSecondaryAction>
				<ButtonGroup>
					<Button
						variant='outlined'
						color='inherit'
						onClick={async () => {
							try {
								if ( session ) {
									await indicator( setBackup() );
									snackbar( 'Data Successfully Saved' );
								} else
									snackbar( 'Sign In to Save', 'info' );
							} catch ( e ) {
								snackbar( String( e ), 'error' );
							}
						}}>
						Save
					</Button>
					<Button
						variant='outlined'
						color='inherit'
						onClick={async () => {
							try {
								if ( session ) {
									await indicator( getBackup() );
									snackbar( 'Data Successfully Loaded' );
								} else
									snackbar( 'Sign In to Load', 'info' );
							} catch ( e ) {
								snackbar( String( e ), 'error' );
							}
						}}>
						Load
					</Button>
				</ButtonGroup>
			</ListItemSecondaryAction>
		</ListItem>
		<ListItem>
			<ListItemText>Theme</ListItemText>
			<ListItemSecondaryAction>
				<ToggleButtonGroup value={main.theme} exclusive>
					<ToggleButton
						value='default'
						onClick={() => dispatch( setTheme( 'default' ) )}>
						<Brightness4Icon/>
					</ToggleButton>
					<ToggleButton
						value='light'
						onClick={() => dispatch( setTheme( 'light' ) )}>
						<BrightnessHighIcon/>
					</ToggleButton>
					<ToggleButton
						value='dark'
						onClick={() => dispatch( setTheme( 'dark' ) )}>
						<Brightness3Icon/>
					</ToggleButton>
				</ToggleButtonGroup>
			</ListItemSecondaryAction>
		</ListItem>
		<ListItem>
			<Typography>
				<Link href='/event' passHref>
					<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
						Event Tracker
					</MuiLink>
				</Link>
				{' '}- calculates farming runs for any stage until you reach your target points
			</Typography>
		</ListItem>
		<ListItem>
			<Typography>
				<Link href='/research' passHref>
					<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
						Research Tracker
					</MuiLink>
				</Link>
				{' '}- calculates number of strengthing units for pr ships until max
			</Typography>
		</ListItem>
		<ListItem>
			<Typography>
				<Link href='/ship' passHref>
					<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
						Ship Tracker
					</MuiLink>
				</Link>
				{' '}- for those who want a fully leveled, fully equipped fleet
			</Typography>
		</ListItem>
	</List>;
}
