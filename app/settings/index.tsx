'use client';
import AsyncButton from '@/components/loaders/asyncButton';
import PageContainer from '@/components/page/container';
import PageLink from '@/components/page/link';
import PageTitle from '@/components/page/title';
import getData from '@/src/firebase/storeSync/getData';
import setData from '@/src/firebase/storeSync/setData';
import { useAuth } from '@/src/providers/auth';
import useAuthButton from '@/src/providers/auth/useAuthButton';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import { mainActions } from '@/src/store/reducers/mainReducer';
import { researchActions } from '@/src/store/reducers/researchReducer';
import { Dialog } from '@capacitor/dialog';
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
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useColorScheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import type { PackageJson } from 'type-fest';
import _packageJson from '../../package.json';

const packageJson = _packageJson as PackageJson;

export default function Settings() {
	const main = useAppSelector(({ main }) => main);
	const dispatch = useAppDispatch();
	const { mode, setMode } = useColorScheme();
	const user = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	const authButton = useAuthButton();

	return (
		<PageContainer noSsr>
			<PageTitle>Settings</PageTitle>
			<List sx={{ '.longText': { width: '80%' } }}>
				<ListItem>
					<ListItemText classes={{ primary: 'longText' }}>
						{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
					</ListItemText>
					<ListItemSecondaryAction>{authButton}</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText>Automatic Cloud Sync</ListItemText>
					<ListItemSecondaryAction>
						<Switch
							checked={main.autoSync}
							onChange={(event) => dispatch(mainActions.setAutoSync(event.target.checked))}
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText>Manual Cloud Sync</ListItemText>
					<ListItemSecondaryAction>
						<ButtonGroup>
							<AsyncButton
								variant='outlined'
								color='inherit'
								onClick={async () => {
									if (user?.emailVerified) {
										await setData(['event', 'research', 'fleet']);
										enqueueSnackbar('Data Successfully Saved', { variant: 'success' });
									} else {
										enqueueSnackbar('Sign In to Save', { variant: 'info' });
									}
								}}>
								Save
							</AsyncButton>
							<AsyncButton
								variant='outlined'
								color='inherit'
								onClick={async () => {
									if (user?.emailVerified) {
										await getData(['event', 'research', 'fleet']);
										enqueueSnackbar('Data Successfully Loaded', { variant: 'success' });
									} else {
										enqueueSnackbar('Sign In to Load', { variant: 'info' });
									}
								}}>
								Load
							</AsyncButton>
						</ButtonGroup>
					</ListItemSecondaryAction>
				</ListItem>
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
								const { value } = await Dialog.confirm({
									title: 'Reset',
									message: 'Are you sure you want to reset this page?',
								});
								if (value) dispatch(eventActions.reset());
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
								const { value } = await Dialog.confirm({
									title: 'Reset',
									message: 'Are you sure you want to reset this page?',
								});
								if (value) dispatch(researchActions.reset());
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
								const { value } = await Dialog.confirm({
									title: 'Reset',
									message: 'Are you sure you want to reset this page?',
								});
								if (value) dispatch(fleetActions.reset());
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
