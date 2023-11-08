'use client';
import AsyncButton from '@/components/loaders/asyncButton';
import OverflowTypography from '@/components/overflowTypography';
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
	IconButton,
	List,
	ListItem,
	ListItemContent,
	ToggleButtonGroup,
	Typography,
	useColorScheme,
} from '@mui/joy';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useStore } from 'react-redux';
import type { PackageJson } from 'type-fest';
import _packageJson from '../../../package.json';

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
					<ListItemContent>
						{user ? `Account: ${user.email}` : 'Sign in for Cloud Save'}
					</ListItemContent>
					<Button component={Link} href={`/api/auth/${user ? 'signout' : 'signin'}`}>
						{user ? 'Sign Out' : 'Sign In'}
					</Button>
				</ListItem>
				{user && (
					<ListItem>
						<ListItemContent>Cloud Sync</ListItemContent>
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
					<ListItemContent>Theme</ListItemContent>
					<ToggleButtonGroup value={mode}>
						<IconButton value='system' onClick={() => setMode('system')}>
							<Brightness4Icon />
						</IconButton>
						<IconButton value='light' onClick={() => setMode('light')}>
							<BrightnessHighIcon />
						</IconButton>
						<IconButton value='dark' onClick={() => setMode('dark')}>
							<Brightness3Icon />
						</IconButton>
					</ToggleButtonGroup>
				</ListItem>
				<ListItem>
					<ListItemContent>
						<PageLink href='/z/event'>Event Tracker</PageLink>
						<OverflowTypography level='body-sm'>
							calculates farming runs for any stage until you reach your target points
						</OverflowTypography>
					</ListItemContent>
					<Button
						color='danger'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(eventActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
				<ListItem>
					<ListItemContent>
						<PageLink href='/z/research'>Research Tracker</PageLink>
						<OverflowTypography level='body-sm'>
							calculates number of strengthening units for pr ships until max
						</OverflowTypography>
					</ListItemContent>
					<Button
						color='danger'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(researchActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
				<ListItem>
					<ListItemContent>
						<PageLink href='/z/fleet'>Fleet Tracker</PageLink>
						<OverflowTypography level='body-sm'>
							for those who want a fully leveled, fully equipped fleet
						</OverflowTypography>
					</ListItemContent>
					<Button
						color='danger'
						onClick={async () => {
							if (!confirm('Are you sure you want to reset this data?')) return;
							dispatch(fleetActions.reset());
						}}>
						Reset
					</Button>
				</ListItem>
			</List>
			<Typography level='body-xs' textAlign='right' px={2}>
				v{packageJson.version}
			</Typography>
		</PageContainer>
	);
}
