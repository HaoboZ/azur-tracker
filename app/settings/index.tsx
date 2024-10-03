'use client';
import AsyncButton from '@/components/loaders/asyncButton';
import PageContainer from '@/components/page/container';
import PageLink from '@/components/page/link';
import PageTitle from '@/components/page/title';
import _packageJson from '@/package.json';
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

const packageJson = _packageJson as PackageJson;

export default function Settings({ user }: { user: Session['user'] }) {
	const store = useStore<RootState>();
	const dispatch = useAppDispatch();
	const { mode, setMode } = useColorScheme();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<PageContainer>
			<PageTitle>Settings</PageTitle>
			<List sx={{ '.longText': { width: '80%' } }}>
				<ListItem>
					<ListItemText>
						{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
					</ListItemText>
					<Button
						variant='contained'
						component={Link}
						href={`/api/auth/${user ? 'signout' : 'signin'}`}>
						{user ? 'Sign Out' : 'Sign In'}
					</Button>
				</ListItem>
				{user && (
					<ListItem>
						<ListItemText>Cloud Sync</ListItemText>
						<ButtonGroup>
							<AsyncButton
								onClick={async () => {
									await saveStore(store);
									enqueueSnackbar('Data Saved', { variant: 'success' });
								}}>
								Save
							</AsyncButton>
							<AsyncButton
								onClick={async () => {
									await loadStore(dispatch);
									enqueueSnackbar('Data Loaded', { variant: 'success' });
								}}>
								Load
							</AsyncButton>
						</ButtonGroup>
					</ListItem>
				)}
				<ListItem>
					<ListItemText>Theme</ListItemText>
					<ToggleButtonGroup value={mode}>
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
				</ListItem>
				<ListItem>
					<ListItemText secondary='calculates farming runs for any stage until you reach your target points'>
						<PageLink href='/event' underline='hover'>
							Event Tracker
						</PageLink>
					</ListItemText>
					<Button
						color='error'
						variant='contained'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(eventActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
				<ListItem>
					<ListItemText secondary='calculates number of strengthening units for pr ships until max'>
						<PageLink href='/research' underline='hover'>
							Research Tracker
						</PageLink>
					</ListItemText>
					<Button
						color='error'
						variant='contained'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(researchActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
				<ListItem>
					<ListItemText secondary='for those who want a fully leveled, fully equipped fleet'>
						<PageLink href='/fleet' underline='hover'>
							Fleet Tracker
						</PageLink>
					</ListItemText>
					<Button
						color='error'
						variant='contained'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(fleetActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
			</List>
			<Typography
				variant='caption'
				color='textDisabled'
				sx={{ display: 'block', textAlign: 'right', px: 2 }}>
				v{packageJson.version}
			</Typography>
		</PageContainer>
	);
}
