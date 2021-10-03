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
	Slider,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../components/link';
import PageContainer from '../components/page/container';
import PageTitle from '../components/page/title';
import { backupMutex, checkDataIntegrity, getBackup, setBackup } from '../lib/backup';
import useNetworkStatus from '../lib/hooks/useNetworkStatus';
import { useIndicator } from '../lib/providers/indicator';
import { event_reset } from '../lib/store/reducers/eventReducer';
import { fleet_reset } from '../lib/store/reducers/fleetReducer';
import {
	setAutoLoad,
	setAutoLoadInterval,
	setAutoSave,
	setAutoSaveInterval,
	setTheme
} from '../lib/store/reducers/mainReducer';
import { research_reset } from '../lib/store/reducers/researchReducer';

// noinspection JSUnusedGlobalSymbols
export default function Home() {
	const main = useSelector( ( { main } ) => main );
	const dispatch = useDispatch();
	const { data, status } = useSession();
	const { enqueueSnackbar } = useSnackbar();
	const indicator = useIndicator();
	const online = useNetworkStatus();
	
	return <PageContainer>
		<Head><title>Settings | Azur Lane Tracker</title></Head>
		<PageTitle>Settings</PageTitle>
		<List sx={{
			'& .longText'  : { width: '80%' },
			'& .longAction': { width: '40%' }
		}}>
			<ListItem>
				{online ? <>
					<ListItemText classes={{ primary: 'longText' }}>
						{status === 'loading' && 'Loading...'}
						{status === 'authenticated' && `Account: ${data.user.email}`}
						{status === 'unauthenticated' && 'Sign in for Cloud Save'}
					</ListItemText>
					{status !== 'loading' && <ListItemSecondaryAction>
						{status === 'authenticated' && <Button
							variant='outlined'
							color='inherit'
							onClick={() => signOut()}>
							Sign Out
						</Button>}
						{status === 'unauthenticated' && <Button
							variant='outlined'
							color='inherit'
							onClick={() => signIn( 'google' )}>
							Sign In
						</Button>}
					</ListItemSecondaryAction>}
				</> : <ListItemText>Offline</ListItemText>}
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
				<ListItemSecondaryAction className='longAction'>
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
				<ListItemSecondaryAction className='longAction'>
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
									if ( !online )
										enqueueSnackbar( 'Offline' );
									else if ( status === 'authenticated' ) {
										await backupMutex.runExclusive( async () =>
											await indicator( setBackup( await checkDataIntegrity() ) ) );
										enqueueSnackbar( 'Data Successfully Saved', { variant: 'success' } );
									} else {
										enqueueSnackbar( 'Sign In to Save', { variant: 'info' } );
									}
								} catch ( e ) {
									enqueueSnackbar( e?.response?.data ?? String( e ), { variant: 'error' } );
								}
							}}>
							Save
						</Button>
						<Button
							variant='outlined'
							color='inherit'
							onClick={async () => {
								try {
									if ( !online )
										enqueueSnackbar( 'Offline' );
									else if ( status === 'authenticated' ) {
										await backupMutex.runExclusive( async () =>
											await indicator( getBackup( await checkDataIntegrity() ) ) );
										enqueueSnackbar( 'Data Successfully Loaded', { variant: 'success' } );
									} else {
										enqueueSnackbar( 'Sign In to Load', { variant: 'info' } );
									}
								} catch ( e ) {
									enqueueSnackbar( e?.response?.data ?? String( e ), { variant: 'error' } );
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
				<ListItemText
					primary={<Link href='/event' underline='always'>
						Event Tracker
					</Link>}
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
					primary={<Link href='/research' underline='always'>
						Research Tracker
					</Link>}
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
					primary={<Link href='/fleet' underline='always'>
						Fleet Tracker
					</Link>}
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
	</PageContainer>;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async ( context ) => {
	return { props: { session: await getSession( context ) } };
};
