import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon
} from '@mui/icons-material';
import {
	Button,
	ButtonGroup,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncLoadingButton from '../components/asyncLoadingButton';
import PageContainer from '../components/page/container';
import PageLink from '../components/page/link';
import PageTitle from '../components/page/title';
import { getBackup, setBackup } from '../lib/firebase/storage';
import useNetworkStatus from '../lib/hooks/useNetworkStatus';
import { useAuth } from '../lib/providers/auth';
import useAuthButton from '../lib/providers/auth/button';
import { useIndicator } from '../lib/providers/indicator';
import { event_reset } from '../lib/store/reducers/eventReducer';
import { fleet_reset } from '../lib/store/reducers/fleetReducer';
import { setAutoLoad, setAutoSave, setTheme } from '../lib/store/reducers/mainReducer';
import { research_reset } from '../lib/store/reducers/researchReducer';

// noinspection JSUnusedGlobalSymbols
export default function Settings() {
	const main = useSelector( ( { main } ) => main );
	const dispatch = useDispatch();
	const user = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	const indicator = useIndicator();
	const online = useNetworkStatus();
	const authButton = useAuthButton();
	
	return (
		<PageContainer>
			<Head><title>Settings | Azur Lane Tracker</title></Head>
			<PageTitle>Settings</PageTitle>
			<List sx={{
				'.longText'  : { width: '80%' },
				'.longAction': { width: '40%' }
			}}>
				<ListItem>
					{online ? (
						<>
							<ListItemText classes={{ primary: 'longText' }}>
								{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
							</ListItemText>
							<ListItemSecondaryAction>
								{authButton}
							</ListItemSecondaryAction>
						</>
					) : <ListItemText>Offline</ListItemText>}
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
					<ListItemText>Manual Backup</ListItemText>
					<ListItemSecondaryAction>
						<ButtonGroup>
							<AsyncLoadingButton
								variant='outlined'
								color='inherit'
								onClick={async () => {
									if ( !online )
										enqueueSnackbar( 'Offline' );
									else if ( user?.emailVerified ) {
										await indicator( setBackup() );
										enqueueSnackbar( 'Data Successfully Saved', { variant: 'success' } );
									} else {
										enqueueSnackbar( 'Sign In to Save', { variant: 'info' } );
									}
								}}>
								Save
							</AsyncLoadingButton>
							<AsyncLoadingButton
								variant='outlined'
								color='inherit'
								onClick={async () => {
									if ( !online )
										enqueueSnackbar( 'Offline' );
									else if ( user?.emailVerified ) {
										await indicator( getBackup() );
										enqueueSnackbar( 'Data Successfully Loaded', { variant: 'success' } );
									} else {
										enqueueSnackbar( 'Sign In to Load', { variant: 'info' } );
									}
								}}>
								Load
							</AsyncLoadingButton>
						</ButtonGroup>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText>Theme</ListItemText>
					<ListItemSecondaryAction>
						<ToggleButtonGroup exclusive value={main.theme}>
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
					<ListItemText
						primary={(
							<PageLink href='/' underline='always'>
								Event Tracker
							</PageLink>
						)}
						secondary='calculates farming runs for any stage until you reach your target points'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								if ( confirm( 'Are you sure you want to reset this page?' ) )
									dispatch( event_reset() );
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={(
							<PageLink href='/research' underline='always'>
								Research Tracker
							</PageLink>
						)}
						secondary='calculates number of strengthening units for pr ships until max'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								if ( confirm( 'Are you sure you want to reset this page?' ) )
									dispatch( research_reset() );
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={(
							<PageLink href='/fleet' underline='always'>
								Fleet Tracker
							</PageLink>
						)}
						secondary='for those who want a fully leveled, fully equipped fleet'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								if ( confirm( 'Are you sure you want to reset this page?' ) )
									dispatch( fleet_reset() );
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</PageContainer>
	);
}
