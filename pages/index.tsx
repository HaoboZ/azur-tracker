import {
	Box,
	Button,
	ButtonGroup, CircularProgress,
	Link as MuiLink, List, ListItem,
	ListItemSecondaryAction, ListItemText,
	Typography
} from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

import { getBackup, setBackup } from '../lib/backup';
import { useSnackBar } from '../lib/provider/snackbarProvider';

export default function Home() {
	const [ session, loading ] = useSession();
	const snackbar = useSnackBar();
	
	if ( loading )
		return <Box display='flex' justifyContent='center'>
			<CircularProgress/>
		</Box>;
	
	return <List>
		{!session ? <ListItem>
			<ListItemText>
				Sign in for cloud.
			</ListItemText>
			<ListItemSecondaryAction>
				<Button
					variant='outlined'
					color='inherit'
					onClick={() => signIn( 'google' )}>
					Sign In
				</Button>
			</ListItemSecondaryAction>
		</ListItem> : <>
			<ListItem>
				<ListItemText>
					Cloud: {session.user.name}
				</ListItemText>
				<ListItemSecondaryAction>
					<Button
						variant='outlined'
						color='inherit'
						onClick={() => signOut()}>
						Sign Out
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
			<ListItem>
				<ListItemText>Actions</ListItemText>
				<ListItemSecondaryAction>
					<ButtonGroup>
						<Button
							variant='outlined'
							color='inherit'
							onClick={async () => {
								await setBackup();
								snackbar.showMessage( 'Data Successfully Saved' );
							}}>
							Save
						</Button>
						<Button
							variant='outlined'
							color='inherit'
							onClick={async () => {
								await getBackup();
								snackbar.showMessage( 'Data Successfully Loaded' );
							}}>
							Load
						</Button>
					</ButtonGroup>
				</ListItemSecondaryAction>
			</ListItem>
		</>}
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
				<Link href='/armada' passHref>
					<MuiLink variant='subtitle1' color='textSecondary' underline='always'>
						Armada Tracker
					</MuiLink>
				</Link>
				{' '}- for those who want a fully leveled, fully equipped fleet, rise my glorious armada
			</Typography>
		</ListItem>
	</List>;
}
