import { Dialog } from '@capacitor/dialog';
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
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import { useOnline } from 'rooks';
import type { PackageJson } from 'type-fest';
import _packageJson from '../../package.json';
import AsyncLoadingButton from '../components/asyncLoadingButton';
import PageContainer from '../components/page/container';
import PageLink from '../components/page/link';
import PageTitle from '../components/page/title';
import getData from '../firebase/storeSync/getData';
import setData from '../firebase/storeSync/setData';
import { useAuth } from '../providers/auth';
import useAuthButton from '../providers/auth/useAuthButton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { event_reset } from '../store/reducers/eventReducer';
import { fleet_reset } from '../store/reducers/fleetReducer';
import { setAutoSync, setTheme } from '../store/reducers/mainReducer';
import { research_reset } from '../store/reducers/researchReducer';

const packageJson = _packageJson as PackageJson;

// noinspection JSUnusedGlobalSymbols
export default function Settings() {
	const main = useAppSelector( ( { main } ) => main );
	const dispatch = useAppDispatch();
	const user = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	const online = useOnline();
	const authButton = useAuthButton();
	
	return (
		<PageContainer>
			<Head><title>Settings | Azur Lane Tracker</title></Head>
			<PageTitle actions={user?.email === 'haobozhang9081@gmail.com' ? [ {
				name   : 'Revalidate',
				onClick: () => axios.post( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate` )
			} ] : undefined}>
				Settings
			</PageTitle>
			<List sx={{ '.longText': { width: '80%' } }}>
				{online ? (
					<ListItem>
						<ListItemText classes={{ primary: 'longText' }}>
							{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
						</ListItemText>
						<ListItemSecondaryAction>
							{authButton}
						</ListItemSecondaryAction>
					</ListItem>
				) : (
					<ListItem>
						<ListItemText>Offline</ListItemText>
					</ListItem>
				)}
				<ListItem>
					<ListItemText>Automatic Cloud Sync</ListItemText>
					<ListItemSecondaryAction>
						<Switch
							checked={main.autoSync}
							onChange={( event ) => dispatch( setAutoSync( event.target.checked ) )}
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText>Manual Cloud Sync</ListItemText>
					<ListItemSecondaryAction>
						<ButtonGroup>
							<AsyncLoadingButton
								variant='outlined'
								color='inherit'
								onClick={async () => {
									if ( !online ) {
										enqueueSnackbar( 'Offline' );
									} else if ( user?.emailVerified ) {
										await setData( [ 'event', 'research', 'fleet' ] );
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
									if ( !online ) {
										enqueueSnackbar( 'Offline' );
									} else if ( user?.emailVerified ) {
										await getData( [ 'event', 'research', 'fleet' ] );
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
							onClick={async () => {
								const { value } = await Dialog.confirm( {
									title  : 'Reset',
									message: 'Are you sure you want to reset this page?'
								} );
								if ( value ) dispatch( event_reset() );
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
							onClick={async () => {
								const { value } = await Dialog.confirm( {
									title  : 'Reset',
									message: 'Are you sure you want to reset this page?'
								} );
								if ( value ) dispatch( research_reset() );
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
							onClick={async () => {
								const { value } = await Dialog.confirm( {
									title  : 'Reset',
									message: 'Are you sure you want to reset this page?'
								} );
								if ( value ) dispatch( fleet_reset() );
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
			<Typography variant='subtitle2' textAlign='right' px={2}>v{packageJson.version}</Typography>
		</PageContainer>
	);
}
