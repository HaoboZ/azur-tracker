'use client';
import AsyncButton from '@/components/loaders/asyncButton';
import PageContainer from '@/components/page/container';
import PageLink from '@/components/page/link';
import PageTitle from '@/components/page/title';
import loadStore from '@/src/providers/syncStore/loadStore';
import saveStore from '@/src/providers/syncStore/saveStore';
import type { RootState } from '@/src/store';
import { useAppDispatch } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import { researchActions } from '@/src/store/reducers/researchReducer';
import {
	Brightness3 as Brightness3Icon,
	Brightness4 as Brightness4Icon,
	BrightnessHigh as BrightnessHighIcon,
} from '@mui/icons-material';
import {
	Button,
	ButtonGroup,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useColorScheme,
} from '@mui/material';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useStore } from 'react-redux';
import type { PackageJson } from 'type-fest';
import _packageJson from '../../package.json';

const packageJson = _packageJson as PackageJson;

export default function Settings({ user }: { user: Session['user'] }) {
	const store = useStore<RootState>();
	const dispatch = useAppDispatch();
	const { mode, setMode } = useColorScheme();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<PageContainer noSsr>
			<PageTitle>Settings</PageTitle>
			<List sx={{ '.longText': { width: '80%' } }}>
				<ListItem>
					<ListItemText classes={{ primary: 'longText' }}>
						{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
					</ListItemText>
					<ListItemSecondaryAction>
						<Button
							variant='outlined'
							component={Link}
							href={`/api/auth/${user ? 'signout' : 'signin'}`}>
							{user ? 'Sign Out' : 'Sign In'}
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
				{user && (
					<ListItem>
						<ListItemText>Cloud Sync</ListItemText>
						<ListItemSecondaryAction>
							<ButtonGroup>
								<AsyncButton
									variant='outlined'
									color='inherit'
									onClick={async () => {
										await saveStore(store);
										enqueueSnackbar('Data Saved', { variant: 'success' });
									}}>
									Save
								</AsyncButton>
								<AsyncButton
									variant='outlined'
									color='inherit'
									onClick={async () => {
										await loadStore(dispatch);
										enqueueSnackbar('Data Loaded', { variant: 'success' });
									}}>
									Load
								</AsyncButton>
							</ButtonGroup>
						</ListItemSecondaryAction>
					</ListItem>
				)}
				<ListItem>
					<ListItemText>Theme</ListItemText>
					<ListItemSecondaryAction>
						<ToggleButtonGroup exclusive value={mode}>
							<ToggleButton value='system' onClick={() => setMode('system')}>
								<Brightness4Icon />
							</ToggleButton>
							<ToggleButton value='light' onClick={() => setMode('light')}>
								<BrightnessHighIcon />
							</ToggleButton>
							<ToggleButton value='dark' onClick={() => setMode('dark')}>
								<Brightness3Icon />
							</ToggleButton>
						</ToggleButtonGroup>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={
							<PageLink href='/event' underline='always'>
								Event Tracker
							</PageLink>
						}
						secondary='calculates farming runs for any stage until you reach your target points'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={async () => {
								if (!confirm('Are you sure you want to reset this data?')) return;
								dispatch(eventActions.reset());
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={
							<PageLink href='/research' underline='always'>
								Research Tracker
							</PageLink>
						}
						secondary='calculates number of strengthening units for pr ships until max'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={async () => {
								if (!confirm('Are you sure you want to reset this data?')) return;
								dispatch(researchActions.reset());
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={
							<PageLink href='/fleet' underline='always'>
								Fleet Tracker
							</PageLink>
						}
						secondary='for those who want a fully leveled, fully equipped fleet'
						classes={{ secondary: 'longText' }}
					/>
					<ListItemSecondaryAction>
						<Button
							variant='contained'
							color='error'
							onClick={async () => {
								if (!confirm('Are you sure you want to reset this data?')) return;
								dispatch(fleetActions.reset());
							}}>
							Reset
						</Button>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
			<Typography variant='subtitle2' textAlign='right' px={2}>
				v{packageJson.version}
			</Typography>
		</PageContainer>
	);
}
